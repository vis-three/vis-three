import { ProxyNotice } from "../../core/ProxyBroadcast";
import { Rule } from "../../core/Rule";
import { ControlsCompiler } from "./ControlsCompiler";

//TODO: rule 直接调用compiler.process
export const ControlsRule: Rule<ControlsCompiler> = function (input: ProxyNotice, compiler: ControlsCompiler) {
  const {operate, key, path, value} = input
  if (operate === 'set') {
    const tempPath = path.concat([])
    const vid = tempPath.shift()
    if (vid) {
      compiler.set(vid, tempPath, key, value)
    } else if (key) {
      compiler.setAll(key)
    } else {
      console.warn(`controls rule can not found controls type in set operate: ${vid}`)
    }
  }
}