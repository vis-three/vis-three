import { Camera, Light, Line, Mesh, Points, Scene, Sprite, MeshLambertMaterial, LineBasicMaterial, PointsMaterial, SpriteMaterial, Material, AmbientLight, DirectionalLight, Texture, PerspectiveCamera, OrthographicCamera, AxesHelper, GridHelper } from "three";
import { SceneHelperCompiler } from "./SceneHelperCompiler";
// 默认相机枚举
export var ModelingSceneCameraDefalutType;
(function (ModelingSceneCameraDefalutType) {
    ModelingSceneCameraDefalutType["DefaultPerspectiveCamera"] = "DefaultPerspectiveCamera";
    ModelingSceneCameraDefalutType["DefaultOrthograpbicCamera"] = "DefaultOrthograpbicCamera";
})(ModelingSceneCameraDefalutType || (ModelingSceneCameraDefalutType = {}));
// 默认视角枚举
export var SCENEVIEWPOINT;
(function (SCENEVIEWPOINT) {
    SCENEVIEWPOINT["DEFAULT"] = "default";
    SCENEVIEWPOINT["TOP"] = "top";
    SCENEVIEWPOINT["BOTTOM"] = "bottom";
    SCENEVIEWPOINT["LEFT"] = "left";
    SCENEVIEWPOINT["RIGHT"] = "right";
    SCENEVIEWPOINT["FRONT"] = "front";
    SCENEVIEWPOINT["BACK"] = "back";
})(SCENEVIEWPOINT || (SCENEVIEWPOINT = {}));
// 默认展示枚举
export var SCENEDISPLAYMODE;
(function (SCENEDISPLAYMODE) {
    SCENEDISPLAYMODE[SCENEDISPLAYMODE["GEOMETRY"] = 0] = "GEOMETRY";
    SCENEDISPLAYMODE[SCENEDISPLAYMODE["MATERIAL"] = 1] = "MATERIAL";
    SCENEDISPLAYMODE[SCENEDISPLAYMODE["LIGHT"] = 2] = "LIGHT";
    SCENEDISPLAYMODE[SCENEDISPLAYMODE["ENV"] = 3] = "ENV";
})(SCENEDISPLAYMODE || (SCENEDISPLAYMODE = {}));
// 重写一下scene的add方法，由于其内部add会调用remove方法，存在藕合性
Scene.prototype.add = function (...object) {
    if (!arguments.length) {
        return this;
    }
    if (arguments.length > 1) {
        for (let i = 0; i < arguments.length; i++) {
            this.add(arguments[i]);
        }
        return this;
    }
    const currentObject = object[0];
    if (currentObject === this) {
        console.error('THREE.Object3D.add: object can\'t be added as a child of itself.', object);
        return this;
    }
    if (currentObject && currentObject.isObject3D) {
        if (currentObject.parent !== null) {
            const index = this.children.indexOf(currentObject);
            if (index !== -1) {
                currentObject.parent = null;
                this.children.splice(index, 1);
                currentObject.dispatchEvent({ type: 'removed' });
            }
        }
        currentObject.parent = this;
        this.children.push(currentObject);
        currentObject.dispatchEvent({ type: 'added' });
    }
    else {
        console.error('THREE.Object3D.add: object not an instance of THREE.Object3D.', object);
    }
    return this;
};
export class ModelingScene extends Scene {
    cameraSet;
    lightSet;
    meshSet;
    lineSet;
    pointsSet;
    spriteSet;
    helperCompiler;
    resetHoverObjectSet;
    resetActiveObjectSet;
    displayMode; // 展示mode
    meshOverrideMaterial;
    lineOverrideMaterial;
    pointsOverrideMaterial;
    spriteOverrideMaterial;
    materialCacheMap;
    defaultAmbientLight;
    defaultDirectionalLight;
    backgroundCache;
    environmentCache;
    defaultPerspectiveCamera; // 默认透视相机
    defaultOrthograpbicCamera; // 默认正交相机
    axesHelper; // 坐标轴辅助
    gridHelper; // 网格辅助
    showAxesHelper; // 是否展示坐标轴辅助
    showGridHelper; // 是否展示网格辅助
    getDefaultPerspectiveCamera; // 获取默认的透视相机
    getDefaultOrthographicCamera; // 获取默认正交相机
    setAxesHelper; // 设置坐标轴辅助
    setGridHelper; // 设置网格辅助
    switchDisplayMode; // 切换场景的渲染模式
    setDisplayMode; // 设置场景渲染模式
    constructor(config) {
        super();
        this.cameraSet = new Set();
        this.lightSet = new Set();
        this.meshSet = new Set();
        this.lineSet = new Set();
        this.pointsSet = new Set();
        this.spriteSet = new Set();
        this.helperCompiler = new SceneHelperCompiler(this);
        this.resetHoverObjectSet = new Set();
        this.resetActiveObjectSet = new Set();
        // 初始化透视相机
        if (config.hasDefaultPerspectiveCamera) {
            if (config.defaultPerspectiveCameraSetting) {
                this.defaultPerspectiveCamera = new PerspectiveCamera(config.defaultPerspectiveCameraSetting.fov, config.defaultPerspectiveCameraSetting.aspect, config.defaultPerspectiveCameraSetting.near, config.defaultPerspectiveCameraSetting.far);
            }
            else {
                this.defaultPerspectiveCamera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
            }
            this.defaultPerspectiveCamera.position.set(30, 30, 30);
            this.defaultPerspectiveCamera.name = '默认透视相机';
            this.cameraSet.add(this.defaultPerspectiveCamera);
            // 获取默认透视相机
            this.getDefaultPerspectiveCamera = function () {
                return this.defaultPerspectiveCamera;
            };
        }
        // 初始化正交相机
        if (config.hasDefaultOrthographicCamera) {
            if (config.defaultOrthographicCameraSetting) {
                const setting = config.defaultOrthographicCameraSetting;
                this.defaultOrthograpbicCamera = new OrthographicCamera(setting.left, setting.right, setting.top, setting.bottom, setting.near, setting.far);
            }
            else {
                const domWidth = window.innerWidth / 2;
                const domHeight = window.innerHeight / 2;
                this.defaultOrthograpbicCamera = new OrthographicCamera(-domWidth / 8, domWidth / 8, domHeight / 8, -domHeight / 8, 1, 1000);
            }
            this.defaultOrthograpbicCamera.name = '默认正交相机';
            this.cameraSet.add(this.defaultOrthograpbicCamera);
            // 获取默认正交相机
            this.getDefaultOrthographicCamera = function () {
                return this.defaultOrthograpbicCamera;
            };
            // 视角监听
            this.addEventListener(`${SCENEVIEWPOINT.TOP}ViewPoint`, e => {
                this.defaultOrthograpbicCamera.position.set(0, 60, 0);
            });
            this.addEventListener(`${SCENEVIEWPOINT.BOTTOM}ViewPoint`, e => {
                this.defaultOrthograpbicCamera.position.set(0, -60, 0);
            });
            this.addEventListener(`${SCENEVIEWPOINT.RIGHT}ViewPoint`, e => {
                this.defaultOrthograpbicCamera.position.set(60, 0, 0);
            });
            this.addEventListener(`${SCENEVIEWPOINT.LEFT}ViewPoint`, e => {
                this.defaultOrthograpbicCamera.position.set(-60, 0, 0);
            });
            this.addEventListener(`${SCENEVIEWPOINT.FRONT}ViewPoint`, e => {
                this.defaultOrthograpbicCamera.position.set(0, 0, 60);
            });
            this.addEventListener(`${SCENEVIEWPOINT.BACK}ViewPoint`, e => {
                this.defaultOrthograpbicCamera.position.set(0, 0, -60);
            });
        }
        // 初始化坐标轴辅助
        if (config.hasAxesHelper) {
            this.axesHelper = new AxesHelper(500);
            this.axesHelper.matrixAutoUpdate = false;
            this.axesHelper.raycast = () => { };
            super.add(this.axesHelper);
            // 设置坐标轴辅助
            this.setAxesHelper = function (setting) {
                const axesHelper = this.axesHelper;
                if (setting.size) {
                    const position = axesHelper.geometry.getAttribute('position');
                    // 改变 1， 3， 5索引的x, y, z
                    position.setX(setting.size, 1);
                    position.setY(setting.size, 3);
                    position.setZ(setting.size, 5);
                    position.needsUpdate = true;
                }
                if (typeof setting.visiable !== undefined) {
                    axesHelper.visible = (setting.visiable);
                }
            };
            // 是否展示坐标轴
            this.showAxesHelper = (show) => {
                if (show) {
                    super.add(this.axesHelper);
                }
                else {
                    super.remove(this.axesHelper);
                }
            };
        }
        // 初始化网格
        if (config.hasGridHelper) {
            const gridHelper = new GridHelper(500, 50, 'rgb(130, 130, 130)', 'rgb(70, 70, 70)');
            gridHelper.raycast = () => { };
            if (gridHelper.material instanceof Material) {
                const material = gridHelper.material;
                material.transparent = true;
                material.opacity = 0.5;
                material.needsUpdate = true;
            }
            gridHelper.matrixAutoUpdate = false;
            gridHelper.raycast = () => { };
            this.gridHelper = gridHelper;
            super.add(gridHelper);
            // 视角监听
            this.addEventListener(`${SCENEVIEWPOINT.DEFAULT}ViewPoint`, e => {
                gridHelper.rotation.set(0, 0, 0);
                gridHelper.updateMatrix();
                gridHelper.updateMatrixWorld();
            });
            this.addEventListener(`${SCENEVIEWPOINT.TOP}ViewPoint`, e => {
                gridHelper.rotation.set(0, 0, 0);
                gridHelper.updateMatrix();
                gridHelper.updateMatrixWorld();
            });
            this.addEventListener(`${SCENEVIEWPOINT.BOTTOM}ViewPoint`, e => {
                gridHelper.rotation.set(0, 0, 0);
                gridHelper.updateMatrix();
                gridHelper.updateMatrixWorld();
            });
            this.addEventListener(`${SCENEVIEWPOINT.RIGHT}ViewPoint`, e => {
                gridHelper.rotation.set(0, 0, Math.PI / 2);
                gridHelper.updateMatrix();
                gridHelper.updateMatrixWorld();
            });
            this.addEventListener(`${SCENEVIEWPOINT.LEFT}ViewPoint`, e => {
                gridHelper.rotation.set(0, 0, Math.PI / 2);
                gridHelper.updateMatrix();
                gridHelper.updateMatrixWorld();
            });
            this.addEventListener(`${SCENEVIEWPOINT.FRONT}ViewPoint`, e => {
                gridHelper.rotation.set(Math.PI / 2, 0, 0);
                gridHelper.updateMatrix();
                gridHelper.updateMatrixWorld();
            });
            this.addEventListener(`${SCENEVIEWPOINT.BACK}ViewPoint`, e => {
                gridHelper.rotation.set(Math.PI / 2, 0, 0);
                gridHelper.updateMatrix();
                gridHelper.updateMatrixWorld();
            });
            // 是否展示网格
            this.showGridHelper = (show) => {
                if (show) {
                    super.add(this.gridHelper);
                }
                else {
                    super.remove(this.gridHelper);
                }
            };
        }
        // 初始化渲染模式
        if (config.hasDisplayMode) {
            // 场景默认覆盖材质
            const overrideColor = 'rgb(250, 250, 250)';
            this.meshOverrideMaterial = new MeshLambertMaterial({ color: overrideColor });
            this.lineOverrideMaterial = new LineBasicMaterial({ color: overrideColor });
            this.pointsOverrideMaterial = new PointsMaterial({ color: overrideColor, size: 5, sizeAttenuation: false });
            this.spriteOverrideMaterial = new SpriteMaterial({ color: overrideColor });
            this.materialCacheMap = new WeakMap();
            this.defaultAmbientLight = new AmbientLight('rgb(255, 255, 255)', 0.5);
            this.defaultAmbientLight.matrixAutoUpdate = false;
            this.defaultDirectionalLight = new DirectionalLight('rgb(255, 255, 255)', 0.3);
            this.defaultDirectionalLight.castShadow = false;
            this.defaultDirectionalLight.position.set(-100, 100, 100);
            this.defaultDirectionalLight.updateMatrix();
            this.defaultDirectionalLight.updateMatrixWorld();
            this.defaultDirectionalLight.matrixAutoUpdate = false;
            this.switchDisplayMode = (mode) => {
                // 过滤材质
                const filterMaterial = () => {
                    const meterialCacheMap = this.materialCacheMap;
                    const meshOverrideMaterial = this.meshOverrideMaterial;
                    this.meshSet.forEach((mesh) => {
                        meterialCacheMap.set(mesh, mesh.material);
                        mesh.material = meshOverrideMaterial;
                    });
                    const lineOverrideMaterial = this.lineOverrideMaterial;
                    this.lineSet.forEach((line) => {
                        meterialCacheMap.set(line, line.material);
                        line.material = lineOverrideMaterial;
                    });
                    const pointsOverrideMaterial = this.pointsOverrideMaterial;
                    this.pointsSet.forEach((points) => {
                        meterialCacheMap.set(points, points.material);
                        points.material = pointsOverrideMaterial;
                    });
                    const spriteOverrideMaterial = this.spriteOverrideMaterial;
                    this.spriteSet.forEach((sprite) => {
                        meterialCacheMap.set(sprite, sprite.material);
                        sprite.material = spriteOverrideMaterial;
                    });
                };
                // 还原材质
                const reduceMaterial = () => {
                    const meterialCacheMap = this.materialCacheMap;
                    this.meshSet.forEach((mesh) => {
                        if (meterialCacheMap.get(mesh)) {
                            mesh.material = meterialCacheMap.get(mesh);
                            meterialCacheMap.delete(mesh);
                        }
                    });
                    this.lineSet.forEach((line) => {
                        if (meterialCacheMap.get(line)) {
                            line.material = meterialCacheMap.get(line);
                            meterialCacheMap.delete(line);
                        }
                    });
                    this.pointsSet.forEach((points) => {
                        if (meterialCacheMap.get(points)) {
                            points.material = meterialCacheMap.get(points);
                            meterialCacheMap.delete(points);
                        }
                    });
                    this.spriteSet.forEach((sprite) => {
                        if (meterialCacheMap.get(sprite)) {
                            sprite.material = meterialCacheMap.get(sprite);
                            meterialCacheMap.delete(sprite);
                        }
                    });
                };
                // 过滤灯光
                const filterLight = () => {
                    this.lightSet.forEach((light) => {
                        super.remove(light);
                    });
                    super.add(this.defaultAmbientLight);
                    super.add(this.defaultDirectionalLight);
                };
                // 还原灯光
                const reduceLight = () => {
                    this.lightSet.forEach((light) => {
                        super.add(light);
                    });
                    super.remove(this.defaultAmbientLight);
                    super.remove(this.defaultDirectionalLight);
                };
                // 过滤场景设置
                const filterScene = () => {
                    if (this.background instanceof Texture) {
                        this.backgroundCache = this.background;
                        this.background = null;
                    }
                    if (this.environment instanceof Texture) {
                        this.environmentCache = this.environment;
                        this.environment = null;
                    }
                };
                // 还原场景
                const reduceScene = () => {
                    if (this.backgroundCache) {
                        this.background = this.backgroundCache;
                        this.backgroundCache = undefined;
                    }
                    if (this.environmentCache) {
                        this.environment = this.environmentCache;
                        this.environmentCache = undefined;
                    }
                };
                if (mode === SCENEDISPLAYMODE.GEOMETRY) {
                    filterMaterial();
                    filterScene();
                    filterLight();
                }
                else if (mode === SCENEDISPLAYMODE.MATERIAL) {
                    reduceMaterial();
                    filterScene();
                    filterLight();
                }
                else if (mode === SCENEDISPLAYMODE.LIGHT) {
                    reduceMaterial();
                    filterScene();
                    reduceLight();
                }
                else if (mode === SCENEDISPLAYMODE.ENV) {
                    reduceMaterial();
                    reduceScene();
                    reduceLight();
                }
                else {
                    console.warn(`VisScene can not set this mode: ${mode}`);
                }
            };
            this.setDisplayMode = (mode) => {
                this.displayMode = mode;
                this.switchDisplayMode(mode);
            };
            if (config.displayMode !== undefined) {
                this.setDisplayMode(config.displayMode);
                this.switchDisplayMode(this.displayMode);
            }
            else {
                this.setDisplayMode(SCENEDISPLAYMODE.ENV);
                this.switchDisplayMode(this.displayMode);
            }
        }
    }
    // 获取辅助编译
    getHelperCompiler() {
        return this.helperCompiler;
    }
    // 设置物体辅助
    setObjectHelperVisiable(visiable) {
        this.helperCompiler.setVisiable(visiable);
    }
    // 设置物体辅助hover状态
    setObjectHelperHover(...object) {
        const resetObjectSet = this.resetHoverObjectSet;
        const activeObjectSet = this.resetActiveObjectSet;
        // object中存在active不会被hover影响
        object.forEach((elem, i, arr) => {
            resetObjectSet.delete(elem);
            if (activeObjectSet.has(elem)) {
                arr.splice(i, 1);
            }
        });
        // 清除需要重置的active物体，他应对交给setAcitve
        activeObjectSet.forEach(elem => {
            resetObjectSet.delete(elem);
        });
        this.helperCompiler.resetHelperColor(...resetObjectSet);
        resetObjectSet.clear();
        this.helperCompiler.setHelperHoverColor(...object);
        object.forEach(elem => {
            resetObjectSet.add(elem);
        });
        return this;
    }
    // 设置物体辅助active
    setObjectHelperActive(...object) {
        const resetObjectSet = this.resetActiveObjectSet;
        object.forEach(elem => {
            resetObjectSet.delete(elem);
        });
        this.helperCompiler.resetHelperColor(...resetObjectSet);
        resetObjectSet.clear();
        this.helperCompiler.setHelperActiveColor(...object);
        object.forEach(elem => {
            resetObjectSet.add(elem);
        });
        return this;
    }
    // 设置物体辅助显示
    showObjectHelper(show) {
        this.helperCompiler.setVisiable(show);
        return this;
    }
    // 设置视角方向
    setViewPoint(direction) {
        this.dispatchEvent({ type: `${direction}ViewPoint` });
    }
    // 添加物体进入场景记录物体与分组 与 渲染模式
    add(...object) {
        let addNumber = 0;
        object.forEach(elem => {
            if (elem instanceof Mesh) {
                this.meshSet.add(elem);
                addNumber += 1;
            }
            else if (elem instanceof Line) {
                this.lineSet.add(elem);
                addNumber += 1;
            }
            else if (elem instanceof Light) {
                this.lightSet.add(elem);
                addNumber += 1;
            }
            else if (elem instanceof Points) {
                this.pointsSet.add(elem);
                addNumber += 1;
            }
            else if (elem instanceof Sprite) {
                this.spriteSet.add(elem);
                addNumber += 1;
            }
            else if (elem instanceof Camera) {
                this.cameraSet.add(elem);
                addNumber += 1;
            }
            // 添加辅助编译
            this.helperCompiler.add(elem);
        });
        if (this.displayMode !== undefined && addNumber > 0) {
            this.switchDisplayMode(this.displayMode);
        }
        return super.add(...object);
    }
    // 清除不同物体组的缓存 材质缓存
    remove(...object) {
        const materialCacheMap = this.materialCacheMap;
        object.forEach(elem => {
            materialCacheMap && materialCacheMap.has(elem) && materialCacheMap.delete(elem);
            if (elem instanceof Mesh) {
                this.meshSet.delete(elem);
            }
            else if (elem instanceof Line) {
                this.lineSet.delete(elem);
            }
            else if (elem instanceof Light) {
                this.lightSet.delete(elem);
            }
            else if (elem instanceof Points) {
                this.pointsSet.delete(elem);
            }
            else if (elem instanceof Sprite) {
                this.spriteSet.delete(elem);
            }
            else if (elem instanceof Camera) {
                this.cameraSet.delete(elem);
            }
            // 移除辅助
            this.helperCompiler.remove(elem);
        });
        return super.remove(...object);
    }
    // 内部直接加入场景
    _add(...object) {
        return super.add(...object);
    }
    // 内部直接移出场景
    _remove(...object) {
        return super.remove(...object);
    }
    // 升级物体的材质
    updateMaterial(object) {
        // displayMode为GEOMETRY模式下，需要手动去更新材质的缓存
        if (this.displayMode !== undefined && this.displayMode === 0) {
            this.materialCacheMap?.set(object, object.material);
            this.switchDisplayMode && this.switchDisplayMode(this.displayMode);
        }
        return this;
    }
}
//# sourceMappingURL=ModelingScene.js.map