import { Compiler, Rule, getSymbolConfig, defineProcessor, SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { validate } from "uuid";
class HelperCompiler extends Compiler {
  constructor() {
    super();
  }
}
const HelperRule = function(input, compiler, validateFun = validate) {
  Rule(input, compiler, validateFun);
};
const getHelperConfig = function() {
  return Object.assign(getSymbolConfig(), {});
};
var HelperProcessor = defineProcessor({
  type: "Helper",
  config: getHelperConfig,
  commands: {
    add: {},
    set: {},
    delete: {}
  },
  create(config, engine) {
    return {};
  },
  dispose() {
  }
});
var index = {
  type: "helper",
  object: true,
  compiler: HelperCompiler,
  rule: HelperRule,
  processors: [HelperProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.ZERO
};
export { index as default };
