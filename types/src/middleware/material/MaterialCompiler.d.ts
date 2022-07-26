import { Material } from "three";
import { Compiler, CompilerTarget } from "../../core/Compiler";
import { MODULETYPE } from "../constants/MODULETYPE";
import { MaterialAllType } from "./MaterialConfig";
export interface MaterialCompilerTarget extends CompilerTarget<MaterialAllType> {
}
export declare class MaterialCompiler extends Compiler<MaterialAllType, MaterialCompilerTarget, Material> {
    MODULE: MODULETYPE;
    constructor();
}
