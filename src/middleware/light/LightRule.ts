import { validate } from "uuid";
import { ProxyNotice } from "../../core/ProxyBroadcast";
import { Rule } from "../../core/Rule";
import { LightCompiler} from "./LightCompiler";


export const LightRule: Rule<LightCompiler> = function (input: ProxyNotice, compiler: LightCompiler) {
  
  const {operate, key, path, value} = input

  if (operate === 'add') {
    if (validate(key)) {
      compiler.add(key, value)
    }
  } else if (operate === 'set') {
    compiler.set(path.concat([]), key, value)
  }
  
}