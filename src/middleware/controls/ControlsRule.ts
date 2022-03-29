import { ProxyNotice } from "../../core/ProxyBroadcast";
import { Rule } from "../../core/Rule";
import { ControlsCompiler } from "./ControlsCompiler";

export const ControlsRule: Rule<ControlsCompiler> = function (input: ProxyNotice, compiler: ControlsCompiler) {
  const {operate, key, path, value} = input
  if (operate === 'set') {
    const tempPath = path.concat([])
    const type = tempPath.shift()
    if (type) {
      compiler.set(type, tempPath, key, value)
    } else {
      console.warn(`controls rule can not found controls type in set operate: ${type}`)
    }
  }
}