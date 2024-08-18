import {
  Compiler,
  CompilerParameters,
  ModelOption,
  uniqueSymbol,
} from "@vis-three/tdcm";
import { validSymbols } from "./ControlsRule";

export class ControlsCompiler extends Compiler {
  constructor(params: CompilerParameters) {
    super(params);
  }

  useModel(
    option: ModelOption<any, any, any, any>,
    callback?: (compiler: this) => void
  ) {
    validSymbols.push(uniqueSymbol(option.type));
    return super.useModel(option, callback);
  }

  /**
   * @deprecated
   * @param processor
   * @param fun
   * @returns
   */
  reigstProcessor(
    option: ModelOption<any, any, any, any>,
    callback?: (compiler: this) => void
  ) {
    return this.useModel(option, callback);
  }
}
