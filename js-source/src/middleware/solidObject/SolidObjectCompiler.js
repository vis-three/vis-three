import { validate } from "uuid";
import { ObjectCompiler } from "../object/ObjectCompiler";
export class SolidObjectCompiler extends ObjectCompiler {
    IS_SOLIDOBJECTCOMPILER = true;
    geometryMap;
    materialMap;
    constructor() {
        super();
        this.geometryMap = new Map();
        this.materialMap = new Map();
        this.mergeFilterAttribute({
            geometry: true,
            material: true,
        });
    }
    // 获取材质
    getMaterial(vid) {
        if (validate(vid)) {
            if (this.materialMap.has(vid)) {
                return this.materialMap.get(vid);
            }
            else {
                console.warn(`${this.MODULE}Compiler: can not found material which vid: ${vid}`);
                return this.getReplaceMaterial();
            }
        }
        else {
            console.warn(`${this.MODULE}Compiler: material vid parameter is illegal: ${vid}`);
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
                console.warn(`${this.MODULE}Compiler: can not found geometry which vid: ${vid}`);
                return this.getReplaceGeometry();
            }
        }
        else {
            console.warn(`${this.MODULE}Compiler: geometry vid parameter is illegal: ${vid}`);
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
    add(vid, config) {
        const object = this.map.get(vid);
        if (!object) {
            console.error(`${this.MODULE} compiler can not finish add method.`);
            return this;
        }
        if (Array.isArray(object.material)) {
            for (const material of object.material) {
                material.dispose();
            }
        }
        else {
            object.material.dispose();
        }
        let material;
        if (typeof config.material === "string") {
            material = this.getMaterial(config.material);
        }
        else {
            material = config.material.map((vid) => this.getMaterial(vid));
        }
        object.material = material;
        if (!object.isSprite) {
            object.geometry.dispose();
            object.geometry = this.getGeometry(config.geometry);
        }
        super.add(vid, config);
        return this;
    }
    set(vid, path, key, value) {
        if (!this.map.has(vid)) {
            console.warn(`${this.MODULE} compiler can not found this vid mapping object: '${vid}'`);
            return this;
        }
        const object = this.map.get(vid);
        if (key === "geometry" && !object.isSprite) {
            object.geometry = this.getGeometry(value);
            return this;
        }
        if (key === "material") {
            object.material = this.getMaterial(value);
            return this;
        }
        super.set(vid, path, key, value);
        return this;
    }
}
//# sourceMappingURL=SolidObjectCompiler.js.map