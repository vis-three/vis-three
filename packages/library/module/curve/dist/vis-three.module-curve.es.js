var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { Compiler, Rule, getSymbolConfig, defineProcessor, SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { validate } from "uuid";
import { EllipseCurve, Vector2, LineCurve } from "three";
class CurveCompiler extends Compiler {
  constructor() {
    super();
  }
}
const CurveRule = function(input, compiler, validateFun = validate) {
  Rule(input, compiler, validateFun);
};
const getCurveConfig = function() {
  return Object.assign(getSymbolConfig(), {
    arcLengthDivisions: 200
  });
};
const getArcCurveConfig = function() {
  return Object.assign(getCurveConfig(), {
    startX: 0,
    startY: 0,
    vertical: 5,
    clockwise: false,
    endX: 10,
    endY: 10
  });
};
const getLineCurveConfig = function() {
  return Object.assign(getCurveConfig(), {
    startX: 0,
    startY: 0,
    endX: 10,
    endY: 10
  });
};
class ArcCurve extends EllipseCurve {
  constructor(startX, startY, vertical, clockwise, endX, endY) {
    super(0, 0, 1, 1, 0, Math.PI * 2, false, 0);
    __publicField(this, "start", new Vector2());
    __publicField(this, "end", new Vector2());
    __publicField(this, "vertical", 0);
    __publicField(this, "center", new Vector2());
    __publicField(this, "tempVector", new Vector2());
    this.start.set(startX, startY);
    this.end.set(endX, endY);
    this.vertical = vertical;
    const tempVector = this.tempVector;
    const start = this.start;
    const end = this.end;
    const mid = new Vector2((endX + startX) / 2, (endY + startY) / 2);
    const center = this.center.copy(this.end).sub(this.start);
    center.set(-center.y, center.x).negate().normalize().multiplyScalar(vertical).add(mid);
    this.aX = center.x;
    this.aY = center.y;
    this.xRadius = tempVector.copy(end).sub(center).length();
    this.yRadius = this.xRadius;
    this.aStartAngle = tempVector.copy(start).sub(center).angle();
    this.aEndAngle = tempVector.copy(end).sub(center).angle();
    this.aClockwise = clockwise;
  }
}
const commonRegCommand = {
  reg: new RegExp(".*"),
  handler({
    config,
    target,
    processor,
    engine,
    compiler
  }) {
    const newCurve = processor.create(config, engine, compiler);
    compiler.map.set(config.vid, newCurve);
    compiler.weakMap.set(newCurve, config.vid);
    compiler.weakMap.delete(target);
    processor.dispose(target, engine, compiler);
  }
};
var ArcCurveProcessor = defineProcessor({
  type: "ArcCurve",
  config: getArcCurveConfig,
  commands: {
    add: {},
    set: {
      $reg: [commonRegCommand]
    },
    delete: {}
  },
  create(config, engine) {
    return new ArcCurve(
      config.startX,
      config.startY,
      config.vertical,
      config.clockwise,
      config.endX,
      config.endY
    );
  },
  dispose() {
  }
});
var LineCurveProcessor = defineProcessor({
  type: "LineCurve",
  config: getLineCurveConfig,
  commands: {
    add: {},
    set: {
      $reg: [commonRegCommand]
    },
    delete: {}
  },
  create(config, engine) {
    return new LineCurve(
      new Vector2(config.startX, config.startY),
      new Vector2(config.endX, config.endY)
    );
  },
  dispose() {
  }
});
var index = {
  type: "curve",
  compiler: CurveCompiler,
  rule: CurveRule,
  processors: [ArcCurveProcessor, LineCurveProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.ZERO - 1
};
export { ArcCurve, CurveCompiler, index as default, getArcCurveConfig, getCurveConfig, getLineCurveConfig };
