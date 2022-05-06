import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";
import { ObjectRule } from "../object/ObjectRule";
import { CSS3DCompiler, CSS3DCompilerTarget } from "./CSS3DCompiler";
import { CSS3DAllType } from "./CSS3DConfig";
export declare type CSS3DRule = ObjectRule<CSS3DCompiler, CSS3DAllType, CSS3DCompilerTarget, CSS3DObject>;
export declare const CSS3DRule: CSS3DRule;
