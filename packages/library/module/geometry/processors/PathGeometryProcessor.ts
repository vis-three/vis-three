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
import { getPathGeometryConfig } from "../GeometryConfig";
import { PathGeometryConfig } from "../GeometryInterface";
import { PathGeometry } from "../extends/PathGeometry";
import { Path } from "three";
import { BaseEvent } from "@vis-three/core";

const cacheBusMap: WeakMap<
  PathGeometry,
  {
    target: Path;
    eventFun: (event: BaseEvent) => void;
  }
> = new WeakMap();

const cacheBusObject = function (
  geometry: PathGeometry,
  object: Path,
  fun: (event: BaseEvent) => void
) {
  cacheBusMap.set(geometry, {
    target: object,
    eventFun: fun,
  });
};

export default defineProcessor<
  PathGeometryConfig,
  PathGeometry,
  EngineSupport,
  GeometryCompiler
>({
  type: "PathGeometry",
  config: getPathGeometryConfig,
  commands: commands as unknown as ProcessorCommands<
    PathGeometryConfig,
    PathGeometry,
    EngineSupport,
    GeometryCompiler
  >,
  create(config, engine) {
    const path =
      (engine.compilerManager.getObjectfromModule(
        MODULETYPE.PATH,
        config.path
      ) as Path) || undefined;

    const geometry = new PathGeometry(path, config.divisions, config.space);

    if (path) {
      const eventFun = () => {
        config.path = config.path;
      };
      Bus.compilerEvent.on(path, COMPILER_EVENT.UPDATE, eventFun);
      cacheBusObject(geometry, path, eventFun);
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
