import { Compiler, Rule, getSymbolConfig, defineProcessor, Bus, COMPILER_EVENT, SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { validate } from "uuid";
import { NumberConstraintor } from "@vis-three/library-constraintor";
class ConstraintorCompiler extends Compiler {
  constructor() {
    super();
  }
}
const ConstraintorRule = function(input, compiler, validateFun = validate) {
  Rule(input, compiler, validateFun);
};
const getConstraintorConfig = function() {
  return Object.assign(getSymbolConfig(), {});
};
const getNumberConstraintorConfig = function() {
  return Object.assign(getConstraintorConfig(), {
    target: "",
    targetAttr: "",
    ref: "",
    refAttr: "",
    offset: null
  });
};
const commonRegCommand = {
  reg: new RegExp(".*"),
  handler(params) {
    params.processor.set(params);
    params.target.constrain();
  }
};
const cacheEventMap = /* @__PURE__ */ new WeakMap();
var NumberConstraintorProcessor = defineProcessor({
  type: "NumberConstraintor",
  config: getNumberConstraintorConfig,
  commands: {
    set: {
      target({ target, config, engine }) {
        if (config.target && config.targetAttr) {
          target.setTarget(
            engine.getConfigBySymbol(config.target),
            config.targetAttr
          );
          target.constrain();
        }
      },
      targetAttr({ target, config, engine }) {
        if (config.target && config.targetAttr) {
          target.setTarget(
            engine.getConfigBySymbol(config.target),
            config.targetAttr
          );
          target.constrain();
        }
      },
      ref({ target, config, engine }) {
        if (config.ref && config.refAttr) {
          target.setReference(
            engine.getConfigBySymbol(config.ref),
            config.refAttr
          );
          target.constrain();
        }
      },
      refAttr({ target, config, engine }) {
        if (config.ref && config.refAttr) {
          target.setReference(
            engine.getConfigBySymbol(config.ref),
            config.refAttr
          );
          target.constrain();
        }
      },
      $reg: [commonRegCommand]
    }
  },
  create(config, engine) {
    const refObject = engine.getObjectBySymbol(config.ref);
    const constraintor = new NumberConstraintor(
      engine.getConfigBySymbol(config.target),
      config.targetAttr,
      engine.getConfigBySymbol(config.ref),
      config.refAttr,
      config.offset ? { ...config.offset } : null
    );
    if (refObject) {
      constraintor.constrain();
      const event = () => {
        constraintor.constrain();
      };
      cacheEventMap.set(constraintor, event);
      Bus.compilerEvent.on(
        refObject,
        `${COMPILER_EVENT.COMPILE}:${config.refAttr}`,
        event
      );
    }
    return constraintor;
  },
  dispose(target) {
    cacheEventMap.delete(target);
  }
});
var index = {
  type: "constraintor",
  compiler: ConstraintorCompiler,
  rule: ConstraintorRule,
  processors: [NumberConstraintorProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.NINE
};
export { index as default };
