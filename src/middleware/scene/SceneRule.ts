import { ProxyNotice } from "../../core/ProxyBroadcast";
import { Rule } from "../../core/Rule";
import { SceneCompiler } from "./SceneCompiler";

export const  SceneRule: Rule<SceneCompiler> = function (input: ProxyNotice, compiler: SceneCompiler) {
  const {operate, key, path, value} = input

  if (operate === 'set') {
    compiler.set(path.concat([]), key, value)
  }
}