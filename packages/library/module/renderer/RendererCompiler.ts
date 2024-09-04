import {
  Compiler,
  CompilerParameters,
  EngineSupport,
  ModelOption,
  uniqueSymbol,
} from "@vis-three/tdcm";
import { validSymbols } from "./RendererRule";

export class RendererCompiler extends Compiler<any> {
  constructor(params: CompilerParameters) {
    super(params);
  }

  useModel(
    option: ModelOption<any, any, any, any, any, Compiler<any>>,
    callback?: ((compiler: this) => void) | undefined
  ): this {
    validSymbols.push(uniqueSymbol(option.type));
    return super.useModel(option, callback);
  }
}
