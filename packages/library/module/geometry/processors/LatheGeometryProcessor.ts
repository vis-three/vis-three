import {
  Bus,
  COMPILER_EVENT,
  EngineSupport,
  MODULETYPE,
  ProcessorCommands,
  defineProcessor,
} from "@vis-three/middleware";
import { LatheGeometryConfig } from "../GeometryInterface";
import { LatheGeometry, Path } from "three";
import { GeometryCompiler } from "../GeometryCompiler";
import { getLatheGeometryConfig } from "../GeometryConfig";
import { commands, create, dispose } from "./common";
import { BaseEvent } from "@vis-three/core";

const cacheBusMap: WeakMap<
  LatheGeometry,
  {
    target: Path;
    eventFun: (event: BaseEvent) => void;
  }
> = new WeakMap();

const cacheBusObject = function (
  geometry: LatheGeometry,
  object: Path,
  fun: (event: BaseEvent) => void
) {
  cacheBusMap.set(geometry, {
    target: object,
    eventFun: fun,
  });
};

export default defineProcessor<
  LatheGeometryConfig,
  LatheGeometry,
  EngineSupport,
  GeometryCompiler
>({
  type: "LatheGeometry",
  config: getLatheGeometryConfig,
  commands: commands as unknown as ProcessorCommands<
    LatheGeometryConfig,
    LatheGeometry,
    EngineSupport,
    GeometryCompiler
  >,
  create(config, engine) {
    const path =
      (engine.compilerManager.getObjectfromModule(
        MODULETYPE.PATH,
        config.path
      ) as Path) || undefined;

    const geometry = new LatheGeometry(
      path ? path.getPoints(config.divisions) : undefined,
      config.segments,
      config.phiStart,
      config.phiLength
    );

    if (path) {
      const eventFun = () => {
        config.path = config.path;
      };
      Bus.compilerEvent.on(path, COMPILER_EVENT.UPDATE, eventFun);
      cacheBusObject(geometry, path, eventFun);
    }

    return create(geometry, config);
  },
  dispose(target) {
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
