import { defineProcessor, Bus, COMPILER_EVENT, SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { SolidObjectCompiler, getSolidObjectConfig, solidObjectCommands, geometryHandler, solidObjectCreate, solidObjectDispose } from "@vis-three/module-solid-object";
import { LineDashedMaterial, Line, LineSegments } from "three";
import { ObjectRule } from "@vis-three/module-object";
class LineCompiler extends SolidObjectCompiler {
  constructor() {
    super();
  }
}
const getLineConfig = function() {
  return Object.assign(getSolidObjectConfig(), {
    geometry: "",
    material: "",
    dashed: false
  });
};
const getLineSegmentsConfig = function() {
  return getLineConfig();
};
const getLineFatConfig = function() {
  return Object.assign(getSolidObjectConfig(), {
    geometry: "",
    material: ""
  });
};
const getLineSegmentsFatConfig = function() {
  return Object.assign(getSolidObjectConfig(), {
    geometry: "",
    material: ""
  });
};
const cacheGeometryMap$1 = /* @__PURE__ */ new WeakMap();
const cacheBusMap$1 = /* @__PURE__ */ new WeakMap();
const cacheBusObject$1 = function(line, geometry, fun) {
  if (!cacheBusMap$1.has(geometry)) {
    cacheBusMap$1.set(geometry, fun);
    Bus.compilerEvent.on(geometry, COMPILER_EVENT.UPDATE, fun);
    cacheGeometryMap$1.set(line, geometry);
  } else {
    console.warn(`Line processor has already exist geometry cache`);
  }
};
const cancelCacheBusObject$1 = function(line, geometry) {
  if (!cacheBusMap$1.has(geometry)) {
    console.warn(
      `Line processor found an error can not found cache geometry:`,
      geometry
    );
    return;
  }
  Bus.compilerEvent.off(
    geometry,
    COMPILER_EVENT.UPDATE,
    cacheBusMap$1.get(geometry)
  );
  cacheBusMap$1.delete(geometry);
  if (cacheGeometryMap$1.get(line) === geometry) {
    cacheGeometryMap$1.delete(line);
  }
};
const changeCacheBusObject$1 = function(line, geometry) {
  const oldGeometry = cacheGeometryMap$1.get(line);
  if (!oldGeometry) {
    console.warn(`line processor can not change line geometry`);
    return;
  }
  const fun = cacheBusMap$1.get(oldGeometry);
  cancelCacheBusObject$1(line, oldGeometry);
  cacheBusObject$1(line, geometry, fun);
};
var LineProcessor = defineProcessor({
  type: "Line",
  config: getLineConfig,
  commands: {
    add: solidObjectCommands.add,
    set: {
      ...solidObjectCommands.set,
      dashed({ target, value }) {
        if (target.material instanceof LineDashedMaterial && value) {
          const fun = () => {
            target.computeLineDistances();
          };
          cacheBusObject$1(target, target.geometry, fun);
          fun();
          return;
        }
        if (!value) {
          cancelCacheBusObject$1(target, target.geometry);
        }
      },
      geometry(params) {
        geometryHandler(params);
        changeCacheBusObject$1(params.target, params.target.geometry);
      }
    },
    delete: solidObjectCommands.delete
  },
  create(config, engine) {
    const line = solidObjectCreate(
      new Line(),
      config,
      { dashed: true },
      engine
    );
    if (line.material instanceof LineDashedMaterial && config.dashed) {
      const fun = () => {
        line.computeLineDistances();
      };
      cacheBusObject$1(line, line.geometry, fun);
      fun();
    }
    return line;
  },
  dispose: solidObjectDispose
});
const LineRule = function(notice, compiler) {
  ObjectRule(notice, compiler);
};
const cacheGeometryMap = /* @__PURE__ */ new WeakMap();
const cacheBusMap = /* @__PURE__ */ new WeakMap();
const cacheBusObject = function(line, geometry, fun) {
  if (!cacheBusMap.has(geometry)) {
    cacheBusMap.set(geometry, fun);
    Bus.compilerEvent.on(geometry, COMPILER_EVENT.UPDATE, fun);
    cacheGeometryMap.set(line, geometry);
  } else {
    console.warn(`LineSegments processor has already exist geometry cache`);
  }
};
const cancelCacheBusObject = function(line, geometry) {
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
    cacheBusMap.get(geometry)
  );
  cacheBusMap.delete(geometry);
  if (cacheGeometryMap.get(line) === geometry) {
    cacheGeometryMap.delete(line);
  }
};
const changeCacheBusObject = function(line, geometry) {
  const oldGeometry = cacheGeometryMap.get(line);
  if (!oldGeometry) {
    console.warn(`line processor can not change line geometry`);
    return;
  }
  const fun = cacheBusMap.get(oldGeometry);
  cancelCacheBusObject(line, oldGeometry);
  cacheBusObject(line, geometry, fun);
};
var LineSegmentsProcessor = defineProcessor({
  type: "LineSegments",
  config: getLineSegmentsConfig,
  commands: {
    add: solidObjectCommands.add,
    set: {
      ...solidObjectCommands.set,
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
      }
    },
    delete: solidObjectCommands.delete
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
  dispose: solidObjectDispose
});
var index = {
  type: "line",
  object: true,
  compiler: LineCompiler,
  rule: LineRule,
  processors: [LineProcessor, LineSegmentsProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE
};
export { LineCompiler, index as default, getLineConfig, getLineFatConfig, getLineSegmentsConfig, getLineSegmentsFatConfig };
