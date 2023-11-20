import {
  Bus,
  COMPILER_EVENT,
  defineProcessor,
  EngineSupport,
} from "@vis-three/middleware";
import {
  geometryHandler,
  solidObjectCommands,
  SolidObjectCommands,
  solidObjectCreate,
  solidObjectDispose,
} from "@vis-three/module-solid-object";
import { BufferGeometry, LineSegments, LineDashedMaterial } from "three";
import { LineCompiler } from "../LineCompiler";
import { getLineSegmentsConfig, LineSegmentsConfig } from "../LineConfig";
import { BaseEvent } from "@vis-three/core";

const cacheGeometryMap: WeakMap<LineSegments, BufferGeometry> = new WeakMap();
const cacheBusMap: WeakMap<BufferGeometry, (event: BaseEvent) => void> =
  new WeakMap();

const cacheBusObject = function (
  line: LineSegments,
  geometry: BufferGeometry,
  fun: (event: BaseEvent) => void
) {
  if (!cacheBusMap.has(geometry)) {
    cacheBusMap.set(geometry, fun);
    Bus.compilerEvent.on(geometry, COMPILER_EVENT.UPDATE, fun);
    cacheGeometryMap.set(line, geometry);
  } else {
    console.warn(`LineSegments processor has already exist geometry cache`);
  }
};

const cancelCacheBusObject = function (
  line: LineSegments,
  geometry: BufferGeometry
) {
  if (!cacheBusMap.has(geometry)) {
    console.warn(
      `LineSegments processor found an error can not found cache geometry:`,
      geometry
    );
    return;
  }

  Bus.compilerEvent.off(
    geometry,
    COMPILER_EVENT.UPDATE,
    cacheBusMap.get(geometry)!
  );

  cacheBusMap.delete(geometry);

  if (cacheGeometryMap.get(line) === geometry) {
    cacheGeometryMap.delete(line);
  }
};

const changeCacheBusObject = function (
  line: LineSegments,
  geometry: BufferGeometry
) {
  const oldGeometry = cacheGeometryMap.get(line);

  if (!oldGeometry) {
    console.warn(`line processor can not change line geometry`);
    return;
  }

  const fun = cacheBusMap.get(oldGeometry)!;

  cancelCacheBusObject(line, oldGeometry);
  cacheBusObject(line, geometry, fun);
};

export default defineProcessor<
  LineSegmentsConfig,
  LineSegments,
  EngineSupport,
  LineCompiler
>({
  type: "LineSegments",
  config: getLineSegmentsConfig,
  commands: {
    add: (<any>(<unknown>solidObjectCommands)).add,
    set: {
      ...(<any>(<unknown>solidObjectCommands)).set,
      dashed({ target, value }) {
        if (target.material instanceof LineDashedMaterial && value) {
          const fun = () => {
            target.computeLineDistances();
          };

          cacheBusObject(target, target.geometry, fun);

          fun();
          return;
        }

        if (!value) {
          cancelCacheBusObject(target, target.geometry);
        }
      },
      geometry(params) {
        geometryHandler(params);
        changeCacheBusObject(params.target, params.target.geometry);
      },
    },
    delete: (<any>(<unknown>solidObjectCommands)).delete,
  },

  create(config, engine) {
    const line = solidObjectCreate(
      new LineSegments(),
      config,
      { dashed: true },
      engine
    );

    if (line.material instanceof LineDashedMaterial && config.dashed) {
      const fun = () => {
        line.computeLineDistances();
      };

      cacheBusObject(line, line.geometry, fun);

      fun();
    }

    return line;
  },
  dispose: solidObjectDispose,
});
