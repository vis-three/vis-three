import { DataSupport } from "../../middleware/DataSupport";
import { MaterialCompiler, MaterialCompilerTarget } from "./MaterialCompiler";
import { MaterialRule } from "./MaterialRule";

export class MaterialDataSupport extends DataSupport<MaterialCompilerTarget, MaterialCompiler> {
  constructor (data?: MaterialCompilerTarget) {
    !data && (data = {})
    super(MaterialRule, data)
  }
}