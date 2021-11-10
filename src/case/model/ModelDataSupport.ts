import { DataSupport } from "../../middleware/DataSupport";
import { ModelCompiler, ModelCompilerTarget } from "./ModelCompiler";
import { ModelRule } from "./ModelRule";

export class ModelDataSupport extends DataSupport<ModelCompilerTarget, ModelCompiler> {
  constructor (data: ModelCompilerTarget) {
    super(ModelRule, data)
  }
}