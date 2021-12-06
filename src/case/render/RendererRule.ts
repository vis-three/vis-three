import { ProxyNotice } from "../../middleware/ProxyBroadcast";
import { Rule } from "../../middleware/Rule";
import { RendererCompiler } from "./RendererCompiler";

export const RendererRule: Rule<RendererCompiler> = function (input: ProxyNotice, compiler: RendererCompiler) {
  const {operate, key, path, value} = input
  if (operate === 'set') {
    compiler.set(path.concat([]), key, value)
  }
}