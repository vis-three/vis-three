import { DataSupport } from "../../core/DataSupport";
import { MaterialCompiler, MaterialCompilerTarget } from "./MaterialCompiler";
import { MaterialRule } from "./MaterialRule";

export class MaterialDataSupport extends DataSupport<MaterialCompilerTarget, MaterialCompiler> {
  constructor (data?: MaterialCompilerTarget) {
    !data && (data = {})
    super(MaterialRule, data)
  }
}