import { Light } from "three";
import { ObjectDataSupport } from "../object/ObjectDataSupport";
import { LightCompiler, LightCompilerTarget } from "./LightCompiler";
import { LightConfigAllType } from "./LightConfig";
import { LightRule } from "./LightRule";
export declare class LightDataSupport extends ObjectDataSupport<LightRule, LightCompiler, LightConfigAllType, LightCompilerTarget, Light> {
    constructor(data?: LightCompilerTarget);
}
