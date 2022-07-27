import { CompilerTarget } from "../../core/Compiler";
import { DataSupport } from "../../core/DataSupport";
import { IgnoreAttribute } from "../../core/ProxyBroadcast";
import { MODULETYPE } from "../constants/MODULETYPE";
import { RendererAllType, RendererCompiler } from "./RendererCompiler";
import { RendererConfigAllType } from "./RendererConfig";
import { RendererRule } from "./RendererRule";

export class RendererDataSupport extends DataSupport<
  RendererConfigAllType,
  RendererAllType,
  RendererCompiler
> {
  MODULE: MODULETYPE = MODULETYPE.RENDERER;

  constructor(
    data?: CompilerTarget<RendererConfigAllType>,
    ignore?: IgnoreAttribute
  ) {
    !data && (data = {});
    super(RendererRule, data, ignore);
  }
}
