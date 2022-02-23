import { validate } from "uuid";
import { ProxyNotice } from "../../core/ProxyBroadcast";
import { Rule } from "../../core/Rule";
import { LineCompiler } from "./LineCompiler";


export const LineRule: Rule<LineCompiler> = function (input: ProxyNotice, compiler: LineCompiler) {
  
  const {operate, key, path, value} = input

  if (operate === 'add') {
    if (validate(key)) {
      compiler.add(key, value)
    }
    return
  }
  
  if (operate === 'set') {
    const tempPath = path.concat([])
    const vid = tempPath.shift()
    if (vid && validate(vid)) {
      compiler.set(vid, tempPath, key, value)
    } else {
      console.warn(`model rule vid is illeage: '${vid}'`)
    }
    return
  }
}