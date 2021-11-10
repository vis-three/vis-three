import { validate } from "uuid";
import { ProxyNotice } from "../../middleware/ProxyBroadcast";
import { Rule } from "../../middleware/Rule";
import { GeometryCompiler } from "./GeometryCompiler";

export const GeometryRule: Rule<GeometryCompiler> = function (notice: ProxyNotice, compiler: GeometryCompiler) {
  const {operate, key, path, value} = notice

  if (operate === 'add') {
    if (validate(key)) {
      compiler.add(key, value)
    }
  }
}