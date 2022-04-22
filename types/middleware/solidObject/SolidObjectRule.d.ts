import { Object3D } from "three";
import { Rule } from "../../core/Rule";
import { SolidObjectCompiler, SolidObjectCompilerTarget } from "./SolidObjectCompiler";
import { SolidObjectConfig } from "./SolidObjectConfig";
export declare type SolidObjectRule<E extends SolidObjectCompiler<C, T, O>, C extends SolidObjectConfig, T extends SolidObjectCompilerTarget<C>, O extends Object3D> = Rule<E>;
