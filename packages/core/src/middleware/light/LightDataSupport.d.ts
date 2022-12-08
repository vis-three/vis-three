import { Light } from "three";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectDataSupport } from "../object/ObjectDataSupport";
import { LightCompiler } from "./LightCompiler";
import { LightConfigAllType } from "./LightConfig";
export declare class LightDataSupport extends ObjectDataSupport<LightConfigAllType, Light, LightCompiler> {
    MODULE: MODULETYPE;
    constructor(data?: Array<LightConfigAllType>);
}
