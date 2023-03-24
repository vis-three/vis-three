import { Compiler, Processor, uniqueSymbol } from "../module";

import { ControlsConfig } from "./ControlsConfig";
import { validSymbols } from "./ControlsRule";

export class ControlsCompiler extends Compiler<ControlsConfig, any> {
  constructor() {
    super();
  }

  reigstProcessor(
    processor: Processor<any, any, any, any>,
    fun: (compiler: Compiler<ControlsConfig, any>) => void
  ): this {
    validSymbols.push(uniqueSymbol(processor.type));
    return super.reigstProcessor(processor, fun);
  }
}
