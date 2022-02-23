import { LineBasicMaterial, Scene } from "three";
import { validate } from "uuid";
import { Compiler } from "../../core/Compiler";
import { LineSegmentsProcessor } from "./LineSegmentsProcessor";
export class LineCompiler extends Compiler {
    IS_OBJECTCOMPILER = true;
    target;
    scene;
    engine;
    map;
    weakMap;
    materialMap;
    objectMapSet;
    processorMap = new Map();
    constructor(parameters) {
        super();
        if (parameters) {
            this.target = parameters.target;
            this.scene = parameters.engine.scene;
            this.engine = parameters.engine;
        }
        else {
            this.scene = new Scene();
            this.target = {};
        }
        this.map = new Map();
        this.weakMap = new WeakMap();
        this.materialMap = new Map();
        this.objectMapSet = new Set();
        const processorMap = new Map();
        processorMap.set('LineSegments', new LineSegmentsProcessor(this));
        this.processorMap = processorMap;
    }
    // 替换材质
    getReplaceMaterial() {
        return new LineBasicMaterial({
            color: 'rgb(150, 150, 150)'
        });
    }
    // 获取材质
    getMaterial(vid) {
        if (validate(vid)) {
            if (this.materialMap.has(vid)) {
                return this.materialMap.get(vid);
            }
            else {
                console.warn(`lineCompiler: can not found material which vid: ${vid}`);
                return this.getReplaceMaterial();
            }
        }
        else {
            console.warn(`lineCompiler: material vid parameter is illegal: ${vid}`);
            return this.getReplaceMaterial();
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
    getSupportVid(object) {
        if (this.weakMap.has(object)) {
            return this.weakMap.get(object);
        }
        else {
            return null;
        }
    }
    add(vid, config) {
        if (!validate(vid)) {
            console.warn(`LineCompiler: vid parameter is illegal: ${vid}`);
            return this;
        }
        if (this.processorMap.has(config.type)) {
            const object = this.processorMap.get(config.type).add(config);
            this.map.set(config.vid, object);
            this.weakMap.set(object, config.vid);
            this.scene.add(object);
        }
        return this;
    }
    set(vid, path, key, value) {
        if (!validate(vid)) {
            console.warn(`model compiler vid is illegal: '${vid}'`);
            return this;
        }
        if (!this.map.has(vid)) {
            console.warn(`model compiler can not found this vid mapping object: '${vid}'`);
            return this;
        }
        let config = this.map.get(vid);
        path.forEach((key, i, arr) => {
            config = config[key];
        });
        config[key] = value;
        return this;
    }
    remove() { }
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
        this.map.forEach((object, vid) => {
            object.geometry.dispose();
        });
        return this;
    }
}
//# sourceMappingURL=LineCompiler.js.map