import {
  defineProcessor,
  EngineSupport,
  MODULETYPE,
} from "@vis-three/middleware";
import { ShapeCompiler } from "../ShapeCompiler";
import { getShapeConfig, ShapeConfig } from "../ShapeConfig";
import { CurvePath, Path, Shape, Vector2 } from "three";

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
      holes({ target, engine, value }) {
        const path = engine.compilerManager.getObjectfromModule(
          MODULETYPE.PATH,
          value
        ) as Path;

        if (!path) {
          console.warn(`shape processor can not found path: ${value}`);
          return;
        }
        target.holes.push(path);
      },
    },
    set: {
      shape({ target, engine, value }) {
        const path = engine.compilerManager.getObjectfromModule(
          MODULETYPE.PATH,
          value
        ) as CurvePath<Vector2>;

        if (!path) {
          console.warn(`shape processor can not found path: ${value}`);
        } else {
          target.curves = path.curves;
        }
      },
      holes({ target, engine, path, value }) {
        const index = Number(path[1]);

        if (!Number.isInteger(index)) {
          console.warn(`shape processor: delete holes error:`, path);
          return;
        }

        const curvePath = engine.compilerManager.getObjectfromModule(
          MODULETYPE.PATH,
          value
        ) as Path;

        if (!curvePath) {
          console.warn(`shape processor can not found path: ${value}`);
          return;
        }

        target.holes[index] = curvePath;
      },
    },
    delete: {
      holes({ target, path }) {
        const index = Number(path[1]);

        if (!Number.isInteger(index)) {
          console.warn(`shape processor: delete holes error:`, path);
          return;
        }

        target.holes.splice(index, 1);
      },
    },
  },
  create(config, engine) {
    const shape = new Shape();
    if (config.shape) {
      const path = engine.compilerManager.getObjectfromModule(
        MODULETYPE.PATH,
        config.shape
      ) as CurvePath<Vector2>;

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
        ) as Path;

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
  },
});
