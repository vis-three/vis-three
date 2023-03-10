import { defineModule } from "../module";
import { RendererCompiler } from "./RendererCompiler";
import { RendererRule } from "./RendererRule";


export default defineModule({
  type: 'renderer',
  compiler: RendererCompiler,
  rule: RendererRule,
  processors: []
})