import { DataSupport } from "../../core/DataSupport";
import { RendererCompiler, RendererCompilerTarget } from "./RendererCompiler";
import { getWebGLRendererConfig } from "./RendererConfig";
import { RendererRule } from "./RendererRule";

export class RendererDataSupport extends DataSupport<RendererCompilerTarget, RendererCompiler> {
  constructor (data?: RendererCompilerTarget) {
    !data && (data = {})
    super(RendererRule, data)
  }
}