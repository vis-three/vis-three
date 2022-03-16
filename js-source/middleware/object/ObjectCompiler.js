import { Scene } from "three";
import { validate } from "uuid";
import { Compiler } from "../../core/Compiler";
export class ObjectCompiler extends Compiler {
    IS_OBJECTCOMPILER = true;
    scene;
    target;
    map;
    weakMap;
    cacheObjectMap;
    geometryMap;
    materialMap;
    objectMapSet;
    constructor(parameters) {
        super();
        if (parameters) {
            parameters.scene && (this.scene = parameters.scene);
            parameters.target && (this.target = parameters.target);
        }
        else {
            this.scene = new Scene();
            this.target = {};
        }
        this.geometryMap = new Map();
        this.materialMap = new Map();
        this.map = new Map();
        this.weakMap = new WeakMap();
        this.objectMapSet = new Set();
        this.cacheObjectMap = new WeakMap();
    }
    // 获取材质
    getMaterial(vid) {
        if (validate(vid)) {
            if (this.materialMap.has(vid)) {
                return this.materialMap.get(vid);
            }
            else {
                console.warn(`${this.COMPILER_NAME}Compiler: can not found material which vid: ${vid}`);
                return this.getReplaceMaterial();
            }
        }
        else {
            console.warn(`${this.COMPILER_NAME}Compiler: material vid parameter is illegal: ${vid}`);
            return this.getReplaceMaterial();
        }
    }
    // 获取几何
    getGeometry(vid) {
        if (validate(vid)) {
            if (this.geometryMap.has(vid)) {
                return this.geometryMap.get(vid);
            }
            else {
                console.warn(`${this.COMPILER_NAME}Compiler: can not found geometry which vid: ${vid}`);
                return this.getReplaceGeometry();
            }
        }
        else {
            console.warn(`${this.COMPILER_NAME}Compiler: geometry vid parameter is illegal: ${vid}`);
            return this.getReplaceGeometry();
        }
    }
    // 获取物体
    getObject(vid) {
        for (const map of this.objectMapSet) {
            if (map.has(vid)) {
                return map.get(vid);
            }
        }
        return null;
    }
    // 设置物体的lookAt方法
    setLookAt(vid, target) {
        // 不能自己看自己
        if (vid === target) {
            console.error(`can not set object lookAt itself.`);
            return this;
        }
        if (!this.map.has(vid)) {
            console.error(`${this.COMPILER_NAME}Compiler: can not found object which vid: ${vid}.`);
            return this;
        }
        const model = this.map.get(vid);
        let cacheData = this.cacheObjectMap.get(model);
        if (!cacheData) {
            cacheData = { lookAtTarget: null, updateMatrixWorldFun: null };
            this.cacheObjectMap.set(model, cacheData);
        }
        if (!target) {
            if (!cacheData.updateMatrixWorldFun) {
                return this;
            }
            model.updateMatrixWorld = cacheData.updateMatrixWorldFun;
            cacheData.lookAtTarget = null;
            cacheData.updateMatrixWorldFun = null;
            return this;
        }
        let lookAtTarget = this.getObject(target);
        if (!lookAtTarget) {
            console.warn(`${this.COMPILER_NAME}Compiler: can not found this vid mapping object: '${vid}'`);
            return this;
        }
        const updateMatrixWorldFun = model.updateMatrixWorld;
        cacheData.updateMatrixWorldFun = updateMatrixWorldFun;
        cacheData.lookAtTarget = lookAtTarget.position;
        model.updateMatrixWorld = (focus) => {
            updateMatrixWorldFun.bind(model)(focus);
            model.lookAt(cacheData.lookAtTarget);
        };
        return this;
    }
    linkGeometryMap(map) {
        this.geometryMap = map;
        return this;
    }
    linkMaterialMap(materialMap) {
        this.materialMap = materialMap;
        return this;
    }
    linkObjectMap(...map) {
        for (let objectMap of map) {
            if (!this.objectMapSet.has(objectMap)) {
                this.objectMapSet.add(objectMap);
            }
        }
        return this;
    }
    setScene(scene) {
        this.scene = scene;
        return this;
    }
    setTarget(target) {
        this.target = target;
        return this;
    }
    getMap() {
        return this.map;
    }
    getObjectSymbol(object) {
        if (this.weakMap.has(object)) {
            return this.weakMap.get(object);
        }
        else {
            return null;
        }
    }
    compileAll() {
        const target = this.target;
        for (const key in target) {
            this.add(key, target[key]);
        }
        return this;
    }
    remove(vid) {
        if (!this.map.has(vid)) {
            console.warn(`${this.COMPILER_NAME}Compiler: can not found object which vid: ${vid}.`);
            return this;
        }
        const object = this.map.get(vid);
        this.scene.remove(object);
        this.weakMap.delete(object);
        this.cacheObjectMap.delete(this.map.get(vid));
        this.map.delete(vid);
        return this;
    }
    dispose() {
        this.map.clear();
        this.objectMapSet.clear();
        return this;
    }
}
//# sourceMappingURL=ObjectCompiler.js.map