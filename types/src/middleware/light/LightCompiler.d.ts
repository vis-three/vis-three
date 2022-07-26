import { Light } from "three";
import { LightConfigAllType } from "./LightConfig";
import { ObjectCompiler, ObjectCompilerTarget } from "../object/ObjectCompiler";
import { MODULETYPE } from "../constants/MODULETYPE";
export interface LightCompilerTarget extends ObjectCompilerTarget<LightConfigAllType> {
}
export declare class LightCompiler extends ObjectCompiler<LightConfigAllType, LightCompilerTarget, Light> {
    MODULE: MODULETYPE;
    constructor();
}
