import { Material } from "three";
import { Compiler } from "../../core/Compiler";
import { MODULETYPE } from "../constants/MODULETYPE";
import { MaterialAllType } from "./MaterialConfig";
export declare class MaterialCompiler extends Compiler<MaterialAllType, Material> {
    MODULE: MODULETYPE;
    constructor();
}
