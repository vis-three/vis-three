import { DataSupport } from "../module";
import { MODULETYPE } from "../constants";
import { RendererAllType, RendererCompiler } from "./RendererCompiler";
import { RendererConfigAllType } from "./RendererConfig";
import { RendererRule } from "./RendererRule";

export class RendererDataSupport extends DataSupport<
  RendererConfigAllType,
  RendererAllType,
  RendererCompiler
> {
  MODULE: MODULETYPE = MODULETYPE.RENDERER;

  constructor(data: Array<RendererConfigAllType> = []) {
    super(RendererRule, data);
  }
}
