import {
  Compiler,
  Rule,
  getSymbolConfig,
  defineProcessor,
  Bus,
  COMPILER_EVENT,
  JSONHandler,
  SUPPORT_LIFE_CYCLE,
} from "@vis-three/middleware";
import { validate } from "uuid";
import {
  NumberConstraintor,
  BoundingBoxConstraintor,
} from "@vis-three/library-constraintor";
class ConstraintorCompiler extends Compiler {
  constructor() {
    super();
  }
}
const ConstraintorRule = function (input, compiler, validateFun = validate) {
  Rule(input, compiler, validateFun);
};
const getConstraintorConfig = function () {
  return Object.assign(getSymbolConfig(), {
    target: "",
  });
};
const getNumberConstraintorConfig = function () {
  return Object.assign(getConstraintorConfig(), {
    target: "",
    targetAttr: "",
    ref: "",
    refAttr: "",
    offset: null,
  });
};
const getBoundingBoxConstraintorConfig = function () {
  return Object.assign(getConstraintorConfig(), {
    targetAttr: "",
    ref: "",
    space: "world",
    offset: {
      position: {
        direction: "+",
        axes: "y",
      },
      operate: "+",
      value: 0,
    },
  });
};
const commonRegCommand = {
  reg: new RegExp(".*"),
  handler(params) {
    params.processor.set(params);
    params.target.constrain();
  },
};
const cacheEventMap$1 = /* @__PURE__ */ new WeakMap();
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
      $reg: [commonRegCommand],
    },
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
      cacheEventMap$1.set(constraintor, event);
      Bus.compilerEvent.on(
        refObject,
        `${COMPILER_EVENT.COMPILE}:${config.refAttr}`,
        event
      );
    }
    return constraintor;
  },
  dispose(target) {
    cacheEventMap$1.delete(target);
  },
});
const cacheEventMap = /* @__PURE__ */ new WeakMap();
const eventList = [
  "geometry",
  "position.x",
  "position.y",
  "position.z",
  "rotation.x",
  "rotation.y",
  "rotation.z",
  "scale.x",
  "scale.y",
  "scale.z",
];
const bindEvent = function (constraintor, object) {
  const event = () => {
    constraintor.constrain();
  };
  cacheEventMap.set(constraintor, event);
  eventList.forEach((path) => {
    Bus.compilerEvent.on(object, `${COMPILER_EVENT.COMPILE}:${path}`, event);
  });
  if (object.geometry) {
    Bus.compilerEvent.on(object.geometry, COMPILER_EVENT.UPDATE, event);
  }
};
const removeEvent = function (constraintor) {
  const object = constraintor.reference;
  const event = cacheEventMap.get(constraintor);
  if (event) {
    eventList.forEach((path) => {
      Bus.compilerEvent.off(object, `${COMPILER_EVENT.COMPILE}:${path}`, event);
    });
    if (object.geometry) {
      Bus.compilerEvent.off(object.geometry, COMPILER_EVENT.UPDATE, event);
    }
  }
};
var BoundingBoxConstraintorProcessor = defineProcessor({
  type: "BoundingBoxConstraintor",
  config: getBoundingBoxConstraintorConfig,
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
      ref({ target, config, engine, value }) {
        removeEvent(target);
        if (!value) {
          return;
        }
        const refObject = engine.getObjectBySymbol(config.ref);
        if (!refObject) {
          console.warn(
            `BoundingBox constraintor processor: can not found object: ${config.ref}`
          );
          return;
        }
        target.setReference(refObject);
        target.constrain();
        bindEvent(target, refObject);
      },
      $reg: [commonRegCommand],
    },
  },
  create(config, engine) {
    const refObject = engine.getObjectBySymbol(config.ref);
    const constraintor = new BoundingBoxConstraintor(
      engine.getConfigBySymbol(config.target),
      config.targetAttr,
      config.space,
      refObject,
      JSONHandler.clone(config.offset)
    );
    if (refObject) {
      constraintor.constrain();
      bindEvent(constraintor, refObject);
    }
    return constraintor;
  },
  dispose(target) {
    removeEvent(target);
  },
});
var index = {
  type: "constraintor",
  compiler: ConstraintorCompiler,
  rule: ConstraintorRule,
  processors: [NumberConstraintorProcessor, BoundingBoxConstraintorProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.NINE,
};
export { index as default };
