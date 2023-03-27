import { RendererCompiler } from "./RendererCompiler";
import { RendererRule } from "./RendererRule";

export default {
  type: "renderer",
  compiler: RendererCompiler,
  rule: RendererRule,
  processors: [],
};
