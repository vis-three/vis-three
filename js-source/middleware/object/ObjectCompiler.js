import { Scene } from "three";
import { validate } from "uuid";
import { Compiler } from "../../core/Compiler";
export class ObjectCompiler extends Compiler {
    IS_OBJECTCOMPILER = true;
    scene;
    target;
    map;
    weakMap;
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
    }
    // 获取材质
    getMaterial(vid) {
        if (validate(vid)) {
            if (this.materialMap.has(vid)) {
                return this.materialMap.get(vid);
            }
            else {
                console.warn(`ObjectCompiler: can not found material which vid: ${vid}`);
                return this.getReplaceMaterial();
            }
        }
        else {
            console.warn(`ObjectCompiler: material vid parameter is illegal: ${vid}`);
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
                console.warn(`ObjectCompiler: can not found geometry which vid: ${vid}`);
                return this.getReplaceGeometry();
            }
        }
        else {
            console.warn(`ObjectCompiler: geometry vid parameter is illegal: ${vid}`);
            return this.getReplaceGeometry();
        }
    }
    linkGeometryMap(map) {
        this.geometryMap = map;
        return this;
    }
    linkMaterialMap(materialMap) {
        this.materialMap = materialMap;
        return this;
    }
    linkObjectMap(map) {
        if (!this.objectMapSet.has(map)) {
            this.objectMapSet.add(map);
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
    compileAll() {
        const target = this.target;
        for (const key in target) {
            this.add(key, target[key]);
        }
        return this;
    }
    dispose() {
        return this;
    }
}
//# sourceMappingURL=ObjectCompiler.js.map