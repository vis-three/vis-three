import { validate } from "uuid";
import { ProxyNotice } from "../../middleware/ProxyBroadcast";
import { Rule } from "../../middleware/Rule";
import { LightCompiler} from "./LightCompiler";

export const LightRule: Rule<LightCompiler> = function (input: ProxyNotice, compiler: LightCompiler) {
  const key = input.key
  const operate = input.operate
  const path = input.path
  const value = input.value

  if (operate === 'add') {
    if (validate(key)) {
      compiler.add(key, value)
    }
  }
  
  if (operate === 'set') {
    compiler.set(path, key, value)
  }
}