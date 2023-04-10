import { Compiler, Rule, getSymbolConfig, defineProcessor, MODULETYPE, SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
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
var ShapeProcessor = defineProcessor({
  type: "Shape",
  config: getShapeConfig,
  commands: {
    add: {
      holes({ target, engine, value }) {
        const path = engine.compilerManager.getObjectfromModule(
          MODULETYPE.PATH,
          value
        );
        if (!path) {
          console.warn(`shape processor can not found path: ${value}`);
          return;
        }
        target.holes.push(path);
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
      }
    }
    if (config.holes.length) {
      for (const vid of config.holes) {
        const path = engine.compilerManager.getObjectfromModule(
          MODULETYPE.PATH,
          vid
        );
        if (!path) {
          console.warn(`shape processor can not found path: ${vid}`);
        } else {
          shape.holes.push(path);
        }
      }
    }
    return shape;
  },
  dispose(target) {
    target.curves = [];
    target.holes = [];
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
