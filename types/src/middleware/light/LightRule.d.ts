import { Light } from "three";
import { ObjectRule } from "../object/ObjectRule";
import { LightCompiler, LightCompilerTarget } from "./LightCompiler";
import { LightConfigAllType } from "./LightConfig";
export declare type LightRule = ObjectRule<LightCompiler, LightConfigAllType, LightCompilerTarget, Light>;
export declare const LightRule: LightRule;
