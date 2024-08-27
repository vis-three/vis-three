import { defineModel, MODEL_EVENT, MODULE_TYPE } from "@vis-three/tdcm";
import { CurvePath, Path, Shape, Vector2 } from "three";
import { getShapeConfig, ShapeConfig } from "../ShapeConfig";

export default defineModel<
  ShapeConfig,
  Shape,
  {
    pathEventMap: Map<CurvePath<Vector2>, () => void>;
  }
>({
  type: "Shape",
  config: getShapeConfig,
  context() {
    return {
      pathEventMap: new Map(),
    };
  },
  commands: {
    add: {
      holes({ model, target, engine, config, value }) {
        const path = engine.compilerManager.getObjectFromModule(
          MODULE_TYPE.PATH,
          value
        ) as Path;

        if (!path) {
          console.warn(`shape model: can not found path: ${value}`);
          return;
        }

        target.holes.push(path);

        const index = config.holes.length - 1;

        const pathEvent = () => {
          config.holes[index] = config.holes[index];
        };

        model.toModel(value)?.on(MODEL_EVENT.COMPILED_UPDATE, pathEvent);

        model.pathEventMap.set(path, pathEvent);
      },
    },
    set: {
      shape({ model, target, engine, value }) {
        const path = engine.compilerManager.getObjectFromModule(
          MODULE_TYPE.PATH,
          value
        ) as CurvePath<Vector2>;

        if (!path) {
          console.warn(`shape model: can not found path: ${value}`);
        } else {
          target.curves = path.curves;
        }
      },
      holes({ target, engine, path, value }) {
        const index = Number(path[1]);

        if (!Number.isInteger(index)) {
          console.warn(`shape model: delete holes error:`, path);
          return;
        }

        const curvePath = engine.compilerManager.getObjectFromModule(
          MODULE_TYPE.PATH,
          value
        ) as Path;

        if (!curvePath) {
          console.warn(`shape model: can not found path: ${value}`);
          return;
        }

        target.holes[index] = curvePath;
      },
    },
    delete: {
      holes({ model, target, path }) {
        const index = Number(path[1]);

        if (!Number.isInteger(index)) {
          console.warn(`shape processor: delete holes error:`, path);
          return;
        }

        model
          .toModel(target.holes[index])
          ?.off(
            MODEL_EVENT.COMPILED_UPDATE,
            model.pathEventMap.get(target.holes[index])
          );

        model.pathEventMap.delete(target.holes[index]);

        target.holes.splice(index, 1);
      },
    },
  },
  create({ model, config, engine }) {
    const shape = new Shape();
    if (config.shape) {
      const path = engine.compilerManager.getObjectFromModule(
        MODULE_TYPE.PATH,
        config.shape
      ) as CurvePath<Vector2>;

      if (!path) {
        console.warn(`shape processor can not found path: ${config.shape}`);
      } else {
        shape.curves = path.curves;

        const pathEvent = () => {
          config.shape = config.shape;
        };

        model.toModel(config.shape)?.on(MODEL_EVENT.COMPILED_UPDATE, pathEvent);

        model.pathEventMap.set(path, pathEvent);
      }
    }

    if (config.holes.length) {
      for (let index = 0; index < config.holes.length; index += 1) {
        const vid = config.holes[index];
        const path = engine.compilerManager.getObjectFromModule(
          MODULE_TYPE.PATH,
          vid
        ) as Path;

        if (!path) {
          console.warn(`shape processor can not found path: ${vid}`);
        } else {
          shape.holes.push(path);

          const pathEvent = () => {
            config.holes[index] = config.holes[index];
          };

          model
            .toModel(config.shape)
            ?.on(MODEL_EVENT.COMPILED_UPDATE, pathEvent);

          model.pathEventMap.set(path, pathEvent);
        }
      }
    }
    return shape;
  },
  dispose({ model, target }) {
    target.curves = [];
    target.holes = [];

    for (const [path, event] of model.pathEventMap.entries()) {
      model.toModel(path)?.off(MODEL_EVENT.COMPILED_UPDATE, event);
    }

    model.pathEventMap.clear();
  },
});
