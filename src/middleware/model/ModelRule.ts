import { validate } from "uuid";
import { ProxyNotice } from "../../core/ProxyBroadcast";
import { Rule } from "../../core/Rule";
import { ModelCompiler } from "./ModelCompiler";

export const ModelRule: Rule<ModelCompiler> = function (notice: ProxyNotice, compiler: ModelCompiler) {
  const {operate, key, path, value} = notice

  if (operate === 'add') {
    if (validate(key)) {
      compiler.add(key, value)
    }
  } else if (operate === 'set') {
    const tempPath = path.concat([])
    const vid = tempPath.shift()
    if (vid && validate(vid)) {
      compiler.set(vid, tempPath, key, value)
    } else {
      console.warn(`model rule vid is illeage: '${vid}'`)
    }
  }
}