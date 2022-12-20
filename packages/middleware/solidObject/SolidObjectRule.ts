import { Rule } from "../module";
import { SolidObject3D, SolidObjectCompiler } from "./SolidObjectCompiler";
import { SolidObjectConfig } from "./SolidObjectConfig";

export type SolidObjectRule<
  E extends SolidObjectCompiler<C, O>,
  C extends SolidObjectConfig,
  O extends SolidObject3D
> = Rule<E>;
