import { Rule } from "../../core/Rule";
import { SolidObject3D, SolidObjectCompiler } from "./SolidObjectCompiler";
import { SolidObjectConfig } from "./SolidObjectConfig";
export declare type SolidObjectRule<E extends SolidObjectCompiler<C, O>, C extends SolidObjectConfig, O extends SolidObject3D> = Rule<E>;
