import {
  Compiler,
  CompilerParameters,
  EngineSupport,
  ModelOption,
  uniqueSymbol,
} from "@vis-three/tdcm";
import { validSymbols } from "./RendererRule";

export class RendererCompiler extends Compiler<EngineSupport> {
  constructor(params: CompilerParameters) {
    super(params);
  }

  useModel(
    option: ModelOption<
      any,
      any,
      any,
      any,
      EngineSupport,
      Compiler<EngineSupport>
    >,
    callback?: ((compiler: this) => void) | undefined
  ): this {
    validSymbols.push(uniqueSymbol(option.type));
    return super.useModel(option, callback);
  }
}
