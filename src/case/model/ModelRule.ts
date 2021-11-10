import { validate } from "uuid";
import { ProxyNotice } from "../../middleware/ProxyBroadcast";
import { Rule } from "../../middleware/Rule";
import { ModelCompiler } from "./ModelCompiler";

export const ModelRule: Rule<ModelCompiler> = function (notice: ProxyNotice, compiler: ModelCompiler) {
  const {operate, key, path, value} = notice

  if (operate === 'add') {
    if (validate(key)) {
      compiler.add(key, value)
    }
  }
}