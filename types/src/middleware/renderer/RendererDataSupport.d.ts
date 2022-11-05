import { CompilerTarget } from "../../core/Compiler";
import { DataSupport } from "../../core/DataSupport";
import { IgnoreAttribute } from "../../core/DataContainer";
import { MODULETYPE } from "../constants/MODULETYPE";
import { RendererAllType, RendererCompiler } from "./RendererCompiler";
import { RendererConfigAllType } from "./RendererConfig";
export declare class RendererDataSupport extends DataSupport<
  RendererConfigAllType,
  RendererAllType,
  RendererCompiler
> {
  MODULE: MODULETYPE;
  constructor(
    data?: CompilerTarget<RendererConfigAllType>,
    ignore?: IgnoreAttribute
  );
}
