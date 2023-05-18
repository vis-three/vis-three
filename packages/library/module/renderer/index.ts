import { RendererCompiler } from "./RendererCompiler";
import { RendererRule } from "./RendererRule";

export * from "./RendererCompiler";
export * from "./RendererConfig";

export default {
  type: "renderer",
  compiler: RendererCompiler,
  rule: RendererRule,
  processors: [],
};
