import { CompilerTarget } from "../../core/Compiler";
import { DataSupport } from "../../core/DataSupport";
import { IgnoreAttribute } from "../../core/ProxyBroadcast";
import { Rule } from "../../core/Rule";
import { MODULETYPE } from "../constants/MODULETYPE";
import { SolidObject3D, SolidObjectCompiler } from "./SolidObjectCompiler";
import { SolidObjectConfig } from "./SolidObjectConfig";

export class SolidObjectDataSupport<
  C extends SolidObjectConfig,
  O extends SolidObject3D,
  P extends SolidObjectCompiler<C, O>
> extends DataSupport<C, O, P> {
  MODULE: MODULETYPE = MODULETYPE.MESH;

  constructor(
    rule: Rule<SolidObjectCompiler<C, O>>,
    data?: CompilerTarget<C>,
    ignore?: IgnoreAttribute
  ) {
    !data && (data = Object.create(Object.prototype));
    super(rule, data!, ignore);
  }
}
