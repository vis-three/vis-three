import { VisCSS2DObject } from "@vis-three/core";
import { ObjectRule } from "@vis-three/module-object";
import { CSS2DCompiler } from "./CSS2DCompiler";
import { CSS2DAllType } from "./CSS2DConfig";
export type CSS2DRule = ObjectRule<CSS2DCompiler, CSS2DAllType, VisCSS2DObject>;
export declare const CSS2DRule: CSS2DRule;
