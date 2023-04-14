import {
  Bus,
  COMPILER_EVENT,
  defineProcessor,
  EngineSupport,
  MODULETYPE,
} from "@vis-three/middleware";
import { ShapeCompiler } from "../ShapeCompiler";
import { getShapeConfig, ShapeConfig } from "../ShapeConfig";
import { CurvePath, Path, Shape, Vector2 } from "three";
import { BaseEvent } from "@vis-three/core";

const cacheBusMap: WeakMap<
  Shape,
  Set<{
    target: Path;
    eventFun: (event: BaseEvent) => void;
  }>
> = new WeakMap();

const cacheBusObject = function (
  shape: Shape,
  object: Path,
  fun: (event: BaseEvent) => void
) {
  if (!cacheBusMap.has(shape)) {
    cacheBusMap.set(shape, new Set());
  }

  const set = cacheBusMap.get(shape)!;
  set.add({
    target: object,
    eventFun: fun,
  });

  Bus.compilerEvent.on(object, COMPILER_EVENT.UPDATE, fun);
};

const cancelCacheBusObject = function (shape: Shape, object: Path) {
  if (!cacheBusMap.has(shape)) {
    console.warn(
      `shape processor found an error can not found cache shape:`,
      shape
    );
    return;
  }

  const set = cacheBusMap.get(shape)!;

  for (const params of set.values()) {
    if (params.target === object) {
      Bus.compilerEvent.off(object, COMPILER_EVENT.UPDATE, params.eventFun);
      set.delete(params);
      break;
    }
  }
};

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
      holes({ target, engine, config, value }) {
        const path = engine.compilerManager.getObjectfromModule(
          MODULETYPE.PATH,
          value
        ) as Path;

        if (!path) {
          console.warn(`shape processor can not found path: ${value}`);
          return;
        }
        target.holes.push(path);
        const index = config.holes.length - 1;
        cacheBusObject(target, path, () => {
          config.holes[index] = config.holes[index];
        });
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
        cancelCacheBusObject(target, target.holes[index]);
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
        cacheBusObject(shape, path as Path, () => {
          config.shape = config.shape;
        });
      }
    }

    if (config.holes.length) {
      for (let index = 0; index < config.holes.length; index += 1) {
        const vid = config.holes[index];
        const path = engine.compilerManager.getObjectfromModule(
          MODULETYPE.PATH,
          vid
        ) as Path;

        if (!path) {
          console.warn(`shape processor can not found path: ${vid}`);
        } else {
          shape.holes.push(path);
          cacheBusObject(shape, path as Path, () => {
            config.holes[index] = config.holes[index];
          });
        }
      }
    }
    return shape;
  },
  dispose(target) {
    target.curves = [];
    target.holes = [];

    const set = cacheBusMap.get(target)!;

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
  },
});
