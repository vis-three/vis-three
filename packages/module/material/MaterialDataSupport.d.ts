import { DataSupport } from "../module";
import { Material } from "three";
import { MODULETYPE } from "../constants";
import { MaterialCompiler } from "./MaterialCompiler";
import { MaterialAllType } from "./MaterialConfig";
export declare class MaterialDataSupport extends DataSupport<MaterialAllType, Material, MaterialCompiler> {
    MODULE: MODULETYPE;
    constructor(data?: Array<MaterialAllType>);
}
