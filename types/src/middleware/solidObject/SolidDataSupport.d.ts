import { CompilerTarget } from "../../core/Compiler";
import { DataSupport } from "../../core/DataSupport";
import { IgnoreAttribute } from "../../core/DataContainer";
import { Rule } from "../../core/Rule";
import { MODULETYPE } from "../constants/MODULETYPE";
import { SolidObject3D, SolidObjectCompiler } from "./SolidObjectCompiler";
import { SolidObjectConfig } from "./SolidObjectConfig";
export declare class SolidObjectDataSupport<
  C extends SolidObjectConfig,
  O extends SolidObject3D,
  P extends SolidObjectCompiler<C, O>
> extends DataSupport<C, O, P> {
  MODULE: MODULETYPE;
  constructor(
    rule: Rule<SolidObjectCompiler<C, O>>,
    data?: CompilerTarget<C>,
    ignore?: IgnoreAttribute
  );
}
