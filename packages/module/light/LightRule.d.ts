import { ObjectRule } from "@vis-three/module-object";
import { Light } from "three";
import { LightCompiler } from "./LightCompiler";
import { LightConfigAllType } from "./LightConfig";
export type LightRule = ObjectRule<LightCompiler, LightConfigAllType, Light>;
export declare const LightRule: LightRule;
