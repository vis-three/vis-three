import {
  Bus,
  COMPILER_EVENT,
  defineProcessor,
  EngineSupport,
  MODULETYPE,
  ProcessorCommands,
} from "@vis-three/middleware";
import { Path } from "three";
import { commands, create, dispose } from "./common";
import { GeometryCompiler } from "../GeometryCompiler";
import { getPathTubeGeometryConfig } from "../GeometryConfig";
import { PathTubeGeometryConfig } from "../GeometryInterface";
import { PathTubeGeometry } from "../extends";
import { BaseEvent } from "@vis-three/core";

const cacheBusMap: WeakMap<
  PathTubeGeometry,
  {
    target: Path;
    eventFun: (event: BaseEvent) => void;
  }
> = new WeakMap();

const cacheBusObject = function (
  geometry: PathTubeGeometry,
  object: Path,
  fun: (event: BaseEvent) => void
) {
  cacheBusMap.set(geometry, {
    target: object,
    eventFun: fun,
  });
};

let restrictor = 0;

export default defineProcessor<
  PathTubeGeometryConfig,
  PathTubeGeometry,
  EngineSupport,
  GeometryCompiler
>({
  type: "PathTubeGeometry",
  config: getPathTubeGeometryConfig,
  commands: commands as unknown as ProcessorCommands<
    PathTubeGeometryConfig,
    PathTubeGeometry,
    EngineSupport,
    GeometryCompiler
  >,
  create: (config, engine) => {
    const path =
      (engine.compilerManager.getObjectfromModule(
        MODULETYPE.PATH,
        config.path
      ) as Path) || undefined;

    const geometry = new PathTubeGeometry(
      path,
      config.tubularSegments,
      config.radius,
      config.radialSegments,
      config.closed
    );

    if (path) {
      const eventFun = () => {
        if (restrictor) {
          return;
        }

        restrictor = window.setTimeout(() => {
          config.path = config.path;
          restrictor = 0;
        }, 1000 / 30);
      };
      Bus.compilerEvent.on(path, COMPILER_EVENT.UPDATE, eventFun);
      cacheBusObject(geometry, path, eventFun);
    }

    return create(
      new PathTubeGeometry(
        engine.getObjectBySymbol(config.path),
        config.tubularSegments,
        config.radius,
        config.radialSegments,
        config.closed
      ),
      config
    );
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
