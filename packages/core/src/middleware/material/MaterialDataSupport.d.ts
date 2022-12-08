import { Material } from "three";
import { DataSupport } from "../../core/DataSupport";
import { MODULETYPE } from "../constants/MODULETYPE";
import { MaterialCompiler } from "./MaterialCompiler";
import { MaterialAllType } from "./MaterialConfig";
export declare class MaterialDataSupport extends DataSupport<MaterialAllType, Material, MaterialCompiler> {
    MODULE: MODULETYPE;
    constructor(data?: Array<MaterialAllType>);
}
