import { Rule, Compiler, uniqueSymbol } from "@vis-three/middleware";
import { validate } from "uuid";
const validSymbols = [];
const ControlsRule = function(input, compiler) {
  Rule(input, compiler, (vid) => {
    return validate(vid) || validSymbols.includes(vid);
  });
};
class ControlsCompiler extends Compiler {
  constructor() {
    super();
  }
  reigstProcessor(processor, fun) {
    validSymbols.push(uniqueSymbol(processor.type));
    return super.reigstProcessor(processor, fun);
  }
}
var index = {
  type: "controls",
  compiler: ControlsCompiler,
  rule: ControlsRule,
  processors: []
};
export { index as default };
