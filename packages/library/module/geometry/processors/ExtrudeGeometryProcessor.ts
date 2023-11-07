import {
  Bus,
  COMPILER_EVENT,
  defineProcessor,
  EngineSupport,
  MODULETYPE,
  ProcessorCommands,
} from "@vis-three/middleware";
import {
  Curve,
  ExtrudeBufferGeometry,
  ExtrudeGeometry,
  Shape,
  Vector3,
} from "three";
import { commands, create, dispose } from "./common";
import { GeometryCompiler } from "../GeometryCompiler";
import { getExtrudeGeometryConfig } from "../GeometryConfig";
import { ExtrudeGeometryConfig } from "../GeometryInterface";
import { BaseEvent } from "@vis-three/core";
import ExtrudeUVGenerator from "../extends/ExtrudeUVGenerator";

const cacheBusMap: WeakMap<
  ExtrudeBufferGeometry,
  Set<{
    target: Shape | Curve<any>;
    eventFun: (event: BaseEvent) => void;
  }>
> = new WeakMap();

const cacheBusObject = function (
  geometry: ExtrudeBufferGeometry,
  object: Shape | Curve<any>,
  fun: (event: BaseEvent) => void
) {
  if (!cacheBusMap.has(geometry)) {
    cacheBusMap.set(geometry, new Set());
  }

  const set = cacheBusMap.get(geometry)!;

  set.add({
    target: object,
    eventFun: fun,
  });
};

export default defineProcessor<
  ExtrudeGeometryConfig,
  ExtrudeGeometry,
  EngineSupport,
  GeometryCompiler
>({
  type: "ExtrudeGeometry",
  config: getExtrudeGeometryConfig,
  commands: commands as unknown as ProcessorCommands<
    ExtrudeGeometryConfig,
    ExtrudeGeometry,
    EngineSupport,
    GeometryCompiler
  >,
  create(config, engine) {
    const shape =
      (engine.compilerManager.getObjectfromModule(
        MODULETYPE.SHAPE,
        config.shapes
      ) as Shape) || undefined;

    const extrudePath =
      (engine.compilerManager.getObjectfromModule(
        MODULETYPE.PATH,
        config.options.extrudePath
      ) as Curve<Vector3>) || undefined;

    const geometry = new ExtrudeBufferGeometry(
      shape,
      Object.assign({}, config.options, {
        extrudePath,
        UVGenerator:
          ExtrudeUVGenerator[config.options.UVGenerator || "default"],
      })
    );

    if (shape) {
      const eventFun = () => {
        config.shapes = config.shapes;
      };
      Bus.compilerEvent.on(shape, COMPILER_EVENT.UPDATE, eventFun);
      cacheBusObject(geometry, shape, eventFun);
    }

    if (extrudePath) {
      const eventFun = () => {
        config.options.extrudePath = config.options.extrudePath;
      };
      Bus.compilerEvent.on(extrudePath, COMPILER_EVENT.UPDATE, eventFun);
      cacheBusObject(geometry, extrudePath, eventFun);
    }

    return create(geometry, config);
  },
  dispose(target, engine, compiler) {
    const set = cacheBusMap.get(target);
    if (set) {
      set.forEach((params) => {
        Bus.compilerEvent.off(
          params.target,
          COMPILER_EVENT.UPDATE,
          params.eventFun
        );
      });
    }

    cacheBusMap.delete(target);
    dispose(target);
  },
});
