import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectCompiler, ObjectCompilerTarget } from "../object/ObjectCompiler";
import { CSS3DAllType } from "./CSS3DConfig";
export interface CSS3DCompilerTarget extends ObjectCompilerTarget<CSS3DAllType> {
}
export declare class CSS3DCompiler extends ObjectCompiler<CSS3DAllType, CSS3DCompilerTarget, CSS3DObject> {
    MODULE: MODULETYPE;
    constructor();
}
