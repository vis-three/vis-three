import { validate } from "uuid";
import { ObjectCompiler, } from "../object/ObjectCompiler";
export class SolidObjectCompiler extends ObjectCompiler {
    IS_SOLIDOBJECTCOMPILER = true;
    geometryMap;
    materialMap;
    constructor(parameters) {
        super(parameters);
        this.geometryMap = new Map();
        this.materialMap = new Map();
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
    linkGeometryMap(map) {
        this.geometryMap = map;
        return this;
    }
    linkMaterialMap(materialMap) {
        this.materialMap = materialMap;
        return this;
    }
}
//# sourceMappingURL=SolidObjectCompiler.js.map