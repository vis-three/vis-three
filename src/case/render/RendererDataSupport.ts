import { DataSupport } from "../../middleware/DataSupport";
import { RendererCompiler, RendererCompilerTarget } from "./RendererCompiler";
import { getWebGLRendererConfig } from "./RendererConfig";
import { RendererRule } from "./RendererRule";

export class RendererDataSupport extends DataSupport<RendererCompilerTarget, RendererCompiler> {
  constructor (data?: RendererCompilerTarget) {
    !data && (data = {
      WebGLRenderer: getWebGLRendererConfig()
    })
    super(RendererRule, data)
  }
}