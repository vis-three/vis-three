import { Rule, Compiler, uniqueSymbol } from "@vis-three/middleware";
import { validate } from "uuid";
const validSymbols = [];
const RendererRule = function(input, compiler) {
  Rule(input, compiler, (vid) => {
    return validate(vid) || validSymbols.includes(vid);
  });
};
class RendererCompiler extends Compiler {
  constructor() {
    super();
  }
  reigstProcessor(processor, fun) {
    validSymbols.push(uniqueSymbol(processor.type));
    return super.reigstProcessor(processor, fun);
  }
}
var index = {
  type: "renderer",
  compiler: RendererCompiler,
  rule: RendererRule,
  processors: []
};
export { index as default };
