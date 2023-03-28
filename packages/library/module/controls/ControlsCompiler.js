import { Compiler, uniqueSymbol } from "@vis-three/middleware";
import { validSymbols } from "./ControlsRule";
export class ControlsCompiler extends Compiler {
    constructor() {
        super();
    }
    reigstProcessor(processor, fun) {
        validSymbols.push(uniqueSymbol(processor.type));
        return super.reigstProcessor(processor, fun);
    }
}
