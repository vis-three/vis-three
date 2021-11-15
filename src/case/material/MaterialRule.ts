import { validate } from "uuid";
import { ProxyNotice } from "../../middleware/ProxyBroadcast";
import { Rule } from "../../middleware/Rule";
import { MaterialCompiler } from "./MaterialCompiler";

export const MaterialRule: Rule<MaterialCompiler> = function (notice: ProxyNotice, compiler: MaterialCompiler) {
  const {operate, key, path, value} = notice

  if (operate === 'add') {
    if (validate(key)) {
      compiler.add(key, value)
    }
  }
}