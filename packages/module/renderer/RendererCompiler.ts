import { Compiler, Processor, uniqueSymbol } from "@vis-three/middleware";
import { RendererConfig } from "./RendererConfig";
import { validSymbols } from "./RendererRule";

export class RendererCompiler extends Compiler<any, any> {
  constructor() {
    super();
  }

  reigstProcessor(
    processor: Processor<any, any, any, any>,
    fun: (compiler: Compiler<RendererConfig, any>) => void
  ): this {
    validSymbols.push(uniqueSymbol(processor.type));
    return super.reigstProcessor(processor, fun);
  }
}
