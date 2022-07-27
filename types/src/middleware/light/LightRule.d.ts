import { Light } from "three";
import { ObjectRule } from "../object/ObjectRule";
import { LightCompiler } from "./LightCompiler";
import { LightConfigAllType } from "./LightConfig";
export declare type LightRule = ObjectRule<LightCompiler, LightConfigAllType, Light>;
export declare const LightRule: LightRule;
