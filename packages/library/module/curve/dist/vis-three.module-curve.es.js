var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { Compiler, Rule, getSymbolConfig, defineProcessor, SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { validate } from "uuid";
import { EllipseCurve, Vector2 } from "three";
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
    start: {
      x: 0,
      y: 0
    },
    vertical: 5,
    clockwise: false,
    end: {
      x: 0,
      y: 0
    }
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
var CurveProcessor = defineProcessor({
  type: "ArcCurve",
  config: getArcCurveConfig,
  commands: {
    add: {},
    set: {},
    delete: {}
  },
  create(config, engine) {
    return new ArcCurve(
      config.start.x,
      config.start.y,
      config.vertical,
      config.clockwise,
      config.end.x,
      config.end.y
    );
  },
  dispose() {
  }
});
var index = {
  type: "curve",
  object: true,
  compiler: CurveCompiler,
  rule: CurveRule,
  processors: [CurveProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.ZERO - 1
};
export { ArcCurve, index as default };
