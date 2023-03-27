import { defineProcessor, EngineSupport } from "@vis-three/middleware";
import { Path, Shape } from "three";
import { ShapeCompiler } from "./ShapeCompiler";
import { getShapeConfig, SegmentConfig, ShapeConfig } from "./ShapeConfig";

enum SHAPE_CURVE {
  MOVE = "moveTo",
  LINE = "lineTo",
  QUADRATICCURVE = "quadraticCurveTo",
  BEZIERCURVE = "bezierCurveTo",
  ELLIPSE = "ellipse",
}

export default defineProcessor<
  ShapeConfig,
  Shape,
  EngineSupport,
  ShapeCompiler
>({
  type: "Shape",
  config: getShapeConfig,
  commands: {
    add: {
      shape: {
        $reg: [
          {
            reg: new RegExp("/d"),
          },
        ],
      },
    },
    delete: {},
  },
  create(config, engine, compiler) {
    const initFun = function (path: Path, list: SegmentConfig[]) {
      for (const command of list) {
        path[command.curve](...command.params);
      }
    };

    const shape = new Shape();

    if (config.shape) {
      initFun(shape, config.shape);
    }

    if (config.holes) {
      for (const hole of config.holes) {
        const path = new Path();
        initFun(path, hole);
        shape.holes.push(path);
      }
    }
    return shape;
  },
  dispose(target) {},
});
