import { ProxyNotice } from "../../core/ProxyBroadcast";
import { Rule } from "../../core/Rule";
import { SpriteCompiler } from "./SpriteCompiler";

export const SpriteRule: Rule<SpriteCompiler> = function (notice: ProxyNotice, compiler: SpriteCompiler) {
  const {operate, key, path, value} = notice

  if (operate === 'add') {
      compiler.add(key, value)
    return
  }
  
  if (operate === 'set') {
    const tempPath = path.concat([])
    const vid = tempPath.shift() as string
    compiler.set(vid, tempPath, key, value)
  }
}