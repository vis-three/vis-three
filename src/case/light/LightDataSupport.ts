import { DataSupport } from "../../middleware/DataSupport";
import { LightCompiler, LightCompilerTarget } from "./LightCompiler";
import { LightRule } from "./LightRule";

export class LightDataSupport extends DataSupport<LightCompilerTarget, LightCompiler> {
  constructor (data?: LightCompilerTarget) {
    !data && (data = {})
    super(LightRule, data)
  }
}