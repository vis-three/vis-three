import { Light } from "three";
import { LightConfigAllType } from "./LightConfig";
import { ObjectCompiler } from "../object/ObjectCompiler";
import { MODULETYPE } from "../constants/MODULETYPE";
export declare class LightCompiler extends ObjectCompiler<LightConfigAllType, Light> {
    MODULE: MODULETYPE;
    constructor();
}
