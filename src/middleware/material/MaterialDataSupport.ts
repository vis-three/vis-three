import { DataSupport } from "../../core/DataSupport";
import { IgnoreAttribute } from "../../core/ProxyBroadcast";
import { MODULETYPE } from "../constants/MODULETYPE";
import { MaterialCompiler, MaterialCompilerTarget } from "./MaterialCompiler";
import { MaterialRule } from "./MaterialRule";

export class MaterialDataSupport extends DataSupport<
  MaterialCompilerTarget,
  MaterialCompiler
> {
  MODULE: MODULETYPE = MODULETYPE.MATERIAL;

  constructor(data?: MaterialCompilerTarget, ignore?: IgnoreAttribute) {
    !data && (data = {});
    super(MaterialRule, data, ignore);
  }
}
