import { defineProcessor, SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { ObjectCompiler, ObjectRule, getObjectConfig, objectCommands, objectCreate, objectDispose } from "@vis-three/module-object";
import { validate } from "uuid";
import { Reflector } from "three/examples/jsm/objects/Reflector";
class ReflectorCompiler extends ObjectCompiler {
  constructor() {
    super();
  }
}
const ReflectorRule = function(input, compiler, validateFun = validate) {
  ObjectRule(input, compiler, validateFun);
};
const getReflectorConfig = function() {
  return Object.assign(getObjectConfig(), {
    geometry: "",
    color: "rgb(127, 127, 127)",
    textureWidth: 0,
    textureHeight: 0,
    clipBias: 0,
    multisample: 4
  });
};
const setSize = function(reflector, config, engine) {
  reflector.getRenderTarget().setSize(
    config.textureHeight || engine.dom.offsetWidth * window.devicePixelRatio,
    config.textureWidth || engine.dom.offsetHeight * window.devicePixelRatio
  );
};
var ReflectorProcessor = defineProcessor({
  type: "Reflector",
  config: getReflectorConfig,
  commands: {
    add: objectCommands.add,
    set: {
      ...objectCommands.set,
      textureHeight({ target, config, engine }) {
        setSize(target, config, engine);
      },
      textureWidth({ target, config, engine }) {
        setSize(target, config, engine);
      }
    },
    delete: objectCommands.delete
  },
  create(config, engine) {
    const reflector = new Reflector(engine.getObjectBySymbol(config.geometry), {
      color: config.color,
      clipBias: config.clipBias,
      textureHeight: config.textureHeight || engine.dom.offsetWidth * window.devicePixelRatio,
      textureWidth: config.textureWidth || engine.dom.offsetHeight * window.devicePixelRatio,
      multisample: config.multisample
    });
    return objectCreate(
      reflector,
      config,
      {
        geometry: true,
        clipBias: true,
        color: true
      },
      engine
    );
  },
  dispose(target) {
    target.geometry = void 0;
    target.dispose();
    objectDispose(target);
  }
});
var index = {
  type: "reflector",
  object: true,
  compiler: ReflectorCompiler,
  rule: ReflectorRule,
  processors: [ReflectorProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE
};
export { index as default };
