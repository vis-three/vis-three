import { validate } from "uuid";
import { ProxyNotice } from "../../middleware/ProxyBroadcast";
import { Rule } from "../../middleware/Rule";
import { CameraCompiler } from "./CameraCompiler";

export const CameraRule: Rule<CameraCompiler> = function (notice: ProxyNotice, compiler: CameraCompiler) {
  const {operate, key, path, value} = notice

  if (operate === 'add') {
    if (validate(key)) {
      compiler.add(key, value)
    }
  }
}