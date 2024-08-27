import { defineModule } from "@vis-three/tdcm";
import { RendererCompiler } from "./RendererCompiler";
import RendererRule from "./RendererRule";

export * from "./RendererCompiler";
export * from "./RendererConfig";

export default defineModule({
  type: "renderer",
  compiler: RendererCompiler,
  rule: RendererRule,
  models: [],
});
