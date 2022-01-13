import { SCENESTATUSMANAGER } from '../case/constants/EVENTTYPE';
import { HELPERCOMPILEREVENTTYPE } from '../engine/ModelingEngine/SceneHelperCompiler';
import { ModelingEngineSupport, MODULETYPE } from '../main';
import { DataSupportManager } from '../manager/DataSupportManager';
import { ResourceManager } from '../manager/ResourceManager';
import { COMPILEREVENTTYPE } from '../middleware/Compiler';
import { VISTRANSFORMEVENTTYPE } from '../optimize/VisTransformControls';
export class ModelingEngineSupportConnector {
    domEngineMap;
    constructor(parameters) {
        if (!parameters.domList.length) {
            console.error(`modeling engine connector must have a dom target`);
            return;
        }
        const dataSupportManager = parameters.dataSupportManager || new DataSupportManager();
        const resourceManager = parameters.resourceManager || new ResourceManager();
        // 创建引擎
        // dom与引擎映射 dom -- engineSupport
        const domEngineMap = new Map();
        const DIEngine = (dom, i, arr) => {
            const engineSupport = new ModelingEngineSupport({
                dom,
                dataSupportManager,
                resourceManager
            });
            domEngineMap.set(dom, engineSupport);
        };
        // 同步物体变换
        let cameraMap;
        let lightMap;
        let modelMap;
        // dom与编译物体映射 dom -- [Map<vid, object3D> ... ]
        const domCompilerObjectMap = new Map();
        // 编译物体反转映射 WeakMap<object3D, vid>
        const objectReversalMap = new WeakMap();
        const syncObject = (dom, i, arr) => {
            const engineSupport = domEngineMap.get(dom);
            // 物体编译器
            const modelCompiler = engineSupport.getCompiler(MODULETYPE.MODEL);
            const lightCompiler = engineSupport.getCompiler(MODULETYPE.LIGHT);
            const cameraCompiler = engineSupport.getCompiler(MODULETYPE.CAMERA);
            // 物体map
            cameraMap = cameraCompiler.getMap();
            lightMap = lightCompiler.getMap();
            modelMap = modelCompiler.getMap();
            // 添加物体map vid -- object
            const objectMapSet = new Set();
            objectMapSet.add(cameraMap);
            objectMapSet.add(lightMap);
            objectMapSet.add(modelMap);
            domCompilerObjectMap.set(dom, objectMapSet);
            // 添加物体反转
            cameraMap.forEach((camera, vid) => {
                objectReversalMap.set(camera, vid);
            });
            lightMap.forEach((light, vid) => {
                objectReversalMap.set(light, vid);
            });
            modelMap.forEach((model, vid) => {
                objectReversalMap.set(model, vid);
            });
            // 运行时添加物体
            modelCompiler.addEventListener(COMPILEREVENTTYPE.ADD, event => {
                const e = event;
                objectReversalMap.set(e.object, e.vid);
            });
            lightCompiler.addEventListener(COMPILEREVENTTYPE.ADD, event => {
                const e = event;
                objectReversalMap.set(e.object, e.vid);
            });
            cameraCompiler.addEventListener(COMPILEREVENTTYPE.ADD, event => {
                const e = event;
                objectReversalMap.set(e.object, e.vid);
            });
        };
        // 同步辅助
        // dom与物体辅助映射 dom -- helperMap
        const domHelperMap = new Map();
        const cacheRootVidHelperMap = new Map();
        const syncHelper = (dom, i, arr) => {
            // 添加物体辅助
            const helperCompiler = domEngineMap.get(dom).getScene().getHelperCompiler();
            const helperMap = helperCompiler.getMap();
            domHelperMap.set(dom, helperMap);
            // 同步辅助物体材质
            // 初始同步
            if (i === 0) {
                helperMap.forEach((helper, object) => {
                    // 查object的vid
                    cacheRootVidHelperMap.set(objectReversalMap.get(object), helper);
                });
            }
            else {
                const currentHelperMap = helperCompiler.getMap();
                currentHelperMap.forEach((helper, object) => {
                    // 查object的vid
                    const rootHelper = cacheRootVidHelperMap.get(objectReversalMap.get(object));
                    const oldMaterial = helper.material;
                    // 清空显存
                    if (Array.isArray(oldMaterial)) {
                        oldMaterial.forEach(material => {
                            material.dispose();
                        });
                    }
                    else {
                        oldMaterial.dispose();
                    }
                    helper.material = rootHelper.material;
                });
            }
            // 运行时同步
            helperCompiler.addEventListener(HELPERCOMPILEREVENTTYPE.ADD, event => {
                const e = event;
                const helper = e.helper;
                const object = e.object;
                // 查出物体vid
                const vid = objectReversalMap.get(object);
                if (vid) {
                    // 从每个引擎里面查出vid对应的物体
                    const otherObjectSet = new Set();
                    domCompilerObjectMap.forEach((engineObjectMapSet, dom) => {
                        engineObjectMapSet.forEach(vidObjectMap => {
                            if (vidObjectMap.has(vid) && vidObjectMap.get(vid) !== object) {
                                otherObjectSet.add(vidObjectMap.get(vid));
                            }
                        });
                    });
                    // 从每个辅助map里面查出对应的辅助
                    const otherHelperSet = new Set();
                    domHelperMap.forEach((helperMap, dom) => {
                        otherObjectSet.forEach(targetObject => {
                            const otherHelper = helperMap.get(targetObject);
                            if (otherHelper && otherHelper !== helper) {
                                otherHelperSet.add(otherHelper);
                            }
                        });
                    });
                    otherObjectSet.clear();
                    // 对齐辅助的材质
                    otherHelperSet.forEach(otherHelper => {
                        const oldMaterial = otherHelper.material;
                        if (oldMaterial !== helper.material) {
                            // 清空显存
                            if (Array.isArray(oldMaterial)) {
                                oldMaterial.forEach(material => {
                                    material.dispose();
                                });
                            }
                            else {
                                oldMaterial.dispose();
                            }
                            otherHelper.material = helper.material;
                        }
                    });
                }
                else {
                    console.error(`connector can not found this object vid sign`, object);
                }
            });
        };
        // 同步场景状态
        const domSceneStatusManagerMap = new Map();
        let cacheVidSet = new Set();
        // 同步激活的function
        const syncActiveFunction = function (event) {
            const e = event;
            const objectSet = e.objectSet;
            // 从激活物体中找出相关vid 
            objectSet.forEach(object => {
                if (objectReversalMap.has(object)) {
                    cacheVidSet.add(objectReversalMap.get(object));
                }
                else {
                    console.warn(`connector can not found this object mapping vid: `, object);
                }
            });
            // 主动设置到其他engine的状态管理器中
            domSceneStatusManagerMap.forEach((manager, dom) => {
                //@ts-ignore
                if (manager !== this) {
                    manager.removeEventListener(SCENESTATUSMANAGER.ACTIVECHANGE, syncActiveFunction); // 防止交叉触发
                    const allObjectMapSet = domCompilerObjectMap.get(dom);
                    const currentObjecSet = new Set();
                    cacheVidSet.forEach(vid => {
                        // TODO: perf some or break
                        allObjectMapSet.forEach(objectMap => {
                            if (objectMap.has(vid)) {
                                currentObjecSet.add(objectMap.get(vid));
                            }
                        });
                    });
                    manager.setActiveObjectSet(...currentObjecSet);
                    currentObjecSet.clear();
                    manager.addEventListener(SCENESTATUSMANAGER.ACTIVECHANGE, syncActiveFunction);
                }
            });
            cacheVidSet.clear();
        };
        const syncSceneStatus = (dom, i, arr) => {
            // 只有运行时同步
            const sceneStatusManager = domEngineMap.get(dom).getSceneStatusManager();
            domSceneStatusManagerMap.set(dom, sceneStatusManager);
            sceneStatusManager.addEventListener(SCENESTATUSMANAGER.ACTIVECHANGE, syncActiveFunction);
        };
        // 同步transformControls
        const domTransformControlsMap = new Map();
        const syncTransformControlsFunction = function (event) {
            const e = event;
            // @ts-ignore
            const target = this.getTarget();
            const mode = e.mode;
            // 通知其他控制器改变位置
            domTransformControlsMap.forEach((controls, dom) => {
                // @ts-ignore
                if (controls !== this) {
                    controls.removeEventListener(VISTRANSFORMEVENTTYPE.OBJECTCHANGED, syncTransformControlsFunction); // 防止交叉触发
                    controls.getTarget()[mode].copy(target[mode]);
                    controls.getTransObjectSet().forEach(object => {
                        object.updateMatrix();
                        object.updateMatrixWorld();
                    });
                    controls.addEventListener(VISTRANSFORMEVENTTYPE.OBJECTCHANGED, syncTransformControlsFunction);
                }
            });
        };
        const syncTransformControls = (dom, i, arr) => {
            // 只有运行时同步
            const controls = domEngineMap.get(dom).getTransformControls();
            domTransformControlsMap.set(dom, controls);
            controls.addEventListener(VISTRANSFORMEVENTTYPE.OBJECTCHANGED, syncTransformControlsFunction);
        };
        // TODO:换一种写法，这个太乱了
        parameters.domList.forEach((dom, i, arr) => {
            // 创建引擎
            DIEngine(dom, i, arr);
            // 同步物体
            syncObject(dom, i, arr);
            // 同步辅助
            syncHelper(dom, i, arr);
            // 同步
            syncSceneStatus(dom, i, arr);
            // 同步
            syncTransformControls(dom, i, arr);
        });
        cacheRootVidHelperMap.clear();
        this.domEngineMap = domEngineMap;
    }
    getEngineSupport(dom) {
        return this.domEngineMap.get(dom);
    }
}
//# sourceMappingURL=ModelingEngineSupportConnector.js.map