import { Compiler, Rule, getSymbolConfig, defineProcessor, MODULETYPE, Bus, COMPILER_EVENT, SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { validate } from "uuid";
import { Shape } from "three";
class ShapeCompiler extends Compiler {
  constructor() {
    super();
  }
}
const ShapeRule = function(input, compiler, validateFun = validate) {
  Rule(input, compiler, validateFun);
};
const getShapeConfig = function() {
  return Object.assign(getSymbolConfig(), {
    shape: "",
    holes: []
  });
};
const cacheBusMap = /* @__PURE__ */ new WeakMap();
const cacheBusObject = function(shape, object, fun) {
  if (!cacheBusMap.has(shape)) {
    cacheBusMap.set(shape, /* @__PURE__ */ new Set());
  }
  const set = cacheBusMap.get(shape);
  set.add({
    target: object,
    eventFun: fun
  });
  Bus.compilerEvent.on(object, COMPILER_EVENT.UPDATE, fun);
};
const cancelCacheBusObject = function(shape, object) {
  if (!cacheBusMap.has(shape)) {
    console.warn(
      `shape processor found an error can not found cache shape:`,
      shape
    );
    return;
  }
  const set = cacheBusMap.get(shape);
  for (const params of set.values()) {
    if (params.target === object) {
      Bus.compilerEvent.off(object, COMPILER_EVENT.UPDATE, params.eventFun);
      set.delete(params);
      break;
    }
  }
};
var ShapeProcessor = defineProcessor({
  type: "Shape",
  config: getShapeConfig,
  commands: {
    add: {
      holes({ target, engine, config, value }) {
        const path = engine.compilerManager.getObjectfromModule(
          MODULETYPE.PATH,
          value
        );
        if (!path) {
          console.warn(`shape processor can not found path: ${value}`);
          return;
        }
        target.holes.push(path);
        const index2 = config.holes.length - 1;
        cacheBusObject(target, path, () => {
          config.holes[index2] = config.holes[index2];
        });
      }
    },
    set: {
      shape({ target, engine, value }) {
        const path = engine.compilerManager.getObjectfromModule(
          MODULETYPE.PATH,
          value
        );
        if (!path) {
          console.warn(`shape processor can not found path: ${value}`);
        } else {
          target.curves = path.curves;
        }
      },
      holes({ target, engine, path, value }) {
        const index2 = Number(path[1]);
        if (!Number.isInteger(index2)) {
          console.warn(`shape processor: delete holes error:`, path);
          return;
        }
        const curvePath = engine.compilerManager.getObjectfromModule(
          MODULETYPE.PATH,
          value
        );
        if (!curvePath) {
          console.warn(`shape processor can not found path: ${value}`);
          return;
        }
        target.holes[index2] = curvePath;
      }
    },
    delete: {
      holes({ target, path }) {
        const index2 = Number(path[1]);
        if (!Number.isInteger(index2)) {
          console.warn(`shape processor: delete holes error:`, path);
          return;
        }
        cancelCacheBusObject(target, target.holes[index2]);
        target.holes.splice(index2, 1);
      }
    }
  },
  create(config, engine) {
    const shape = new Shape();
    if (config.shape) {
      const path = engine.compilerManager.getObjectfromModule(
        MODULETYPE.PATH,
        config.shape
      );
      if (!path) {
        console.warn(`shape processor can not found path: ${config.shape}`);
      } else {
        shape.curves = path.curves;
        cacheBusObject(shape, path, () => {
          config.shape = config.shape;
        });
      }
    }
    if (config.holes.length) {
      for (let index2 = 0; index2 < config.holes.length; index2 += 1) {
        const vid = config.holes[index2];
        const path = engine.compilerManager.getObjectfromModule(
          MODULETYPE.PATH,
          vid
        );
        if (!path) {
          console.warn(`shape processor can not found path: ${vid}`);
        } else {
          shape.holes.push(path);
          cacheBusObject(shape, path, () => {
            config.holes[index2] = config.holes[index2];
          });
        }
      }
    }
    return shape;
  },
  dispose(target) {
    target.curves = [];
    target.holes = [];
    const set = cacheBusMap.get(target);
    if (!target) {
      console.warn(
        `shape processor found an error can not found cache shape:`,
        target
      );
      return;
    }
    set.forEach((params) => {
      cancelCacheBusObject(target, params.target);
    });
    cacheBusMap.delete(target);
  }
});
var index = {
  type: "shape",
  compiler: ShapeCompiler,
  rule: ShapeRule,
  processors: [ShapeProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.ONE
};
export { index as default };
