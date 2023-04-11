import {
  Bus,
  COMPILER_EVENT,
  defineProcessor,
  EngineSupport,
  MODULETYPE,
  ProcessorCommands,
} from "@vis-three/middleware";
import { commands, create, dispose } from "./common";
import { GeometryCompiler } from "../GeometryCompiler";
import { getShapeGeometryConfig } from "../GeometryConfig";
import { ShapeGeometryConfig } from "../GeometryInterface";
import { Path, Shape, ShapeBufferGeometry, ShapeGeometry } from "three";
import { BaseEvent } from "@vis-three/core";

const cacheBusMap: WeakMap<
  ShapeBufferGeometry,
  {
    target: Path;
    eventFun: (event: BaseEvent) => void;
  }
> = new WeakMap();

const cacheBusObject = function (
  geometry: ShapeBufferGeometry,
  object: Path,
  fun: (event: BaseEvent) => void
) {
  cacheBusMap.set(geometry, {
    target: object,
    eventFun: fun,
  });
};

export default defineProcessor<
  ShapeGeometryConfig,
  ShapeGeometry,
  EngineSupport,
  GeometryCompiler
>({
  type: "ShapeGeometry",
  config: getShapeGeometryConfig,
  commands: commands as unknown as ProcessorCommands<
    ShapeGeometryConfig,
    ShapeGeometry,
    EngineSupport,
    GeometryCompiler
  >,
  create(config, engine) {
    const shape =
      (engine.compilerManager.getObjectfromModule(
        MODULETYPE.SHAPE,
        config.shape
      ) as Shape) || undefined;

    const geometry = new ShapeBufferGeometry(shape, config.curveSegments);

    if (shape) {
      const eventFun = () => {
        config.shape = config.shape;
      };
      Bus.compilerEvent.on(shape, COMPILER_EVENT.UPDATE, eventFun);
      cacheBusObject(geometry, shape, eventFun);
    }

    return create(geometry, config);
  },
  dispose(target, engine, compiler) {
    const params = cacheBusMap.get(target);
    if (params) {
      Bus.compilerEvent.off(
        params.target,
        COMPILER_EVENT.UPDATE,
        params.eventFun
      );
    }

    cacheBusMap.delete(target);
    dispose(target);
  },
});
