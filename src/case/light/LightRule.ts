import { validate } from "uuid";
import { ProxyNotice } from "../../middleware/ProxyBroadcast";
import { Rule } from "../../middleware/Rule";
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