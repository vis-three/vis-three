import { Pass } from "three/examples/jsm/postprocessing/Pass";
import { CompilerTarget } from "../../core/Compiler";
import { DataSupport } from "../../core/DataSupport";
import { IgnoreAttribute } from "../../core/ProxyBroadcast";
import { MODULETYPE } from "../constants/MODULETYPE";
import { PassCompiler } from "./PassCompiler";
import { PassConfigAllType } from "./PassConfig";
import { PassRule } from "./PassRule";

export class PassDataSupport extends DataSupport<
  PassConfigAllType,
  Pass,
  PassCompiler
> {
  MODULE: MODULETYPE = MODULETYPE.PASS;

  constructor(
    data?: CompilerTarget<PassConfigAllType>,
    ignore?: IgnoreAttribute
  ) {
    !data && (data = {});
    super(PassRule, data, ignore);
  }
}
