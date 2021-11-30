import { DataSupport } from "../../middleware/DataSupport";
import { ModelCompiler, ModelCompilerTarget } from "./ModelCompiler";
import { ModelRule } from "./ModelRule";

export class ModelDataSupport extends DataSupport<ModelCompilerTarget, ModelCompiler> {
  constructor (data?: ModelCompilerTarget) {
    !data && (data = {})
    super(ModelRule, data)
  }
}