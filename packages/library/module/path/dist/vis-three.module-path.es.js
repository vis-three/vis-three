var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { Compiler, Rule, getSymbolConfig, defineProcessor, SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { validate } from "uuid";
import { EllipseCurve, MathUtils, Vector2, Path, LineCurve, CubicBezierCurve, QuadraticBezierCurve, LineCurve3, Vector3, CubicBezierCurve3, QuadraticBezierCurve3 } from "three";
class PathCompiler extends Compiler {
  constructor() {
    super();
  }
  compile(vid, notice) {
    super.compile(vid, notice);
    return this;
  }
}
const PathRule = function(input, compiler, validateFun = validate) {
  Rule(input, compiler, validateFun);
};
const getPathConfig = function() {
  return Object.assign(getSymbolConfig(), {
    curves: [],
    autoClose: false
  });
};
const getPath3Config = function() {
  return Object.assign(getSymbolConfig(), { curves: [], autoClose: false });
};
const _ArcCurve = class extends EllipseCurve {
  constructor(startX, startY, ctX, ctY, endX, endY) {
    super(0, 0, 1, 1, 0, Math.PI * 2, false, 0);
    __publicField(this, "start", new Vector2());
    __publicField(this, "end", new Vector2());
    __publicField(this, "vertical", 0);
    __publicField(this, "center", new Vector2());
    __publicField(this, "mid", new Vector2());
    const x1 = startX;
    const x2 = ctX;
    const x3 = endX;
    const y1 = startY;
    const y2 = ctY;
    const y3 = endY;
    const a = x1 - x2;
    const b = y1 - y2;
    const c = x1 - x3;
    const d = y1 - y3;
    const e = (x1 * x1 - x2 * x2 + (y1 * y1 - y2 * y2)) / 2;
    const f = (x1 * x1 - x3 * x3 + (y1 * y1 - y3 * y3)) / 2;
    const det = b * c - a * d;
    const rx = -(d * e - b * f) / det;
    const ry = -(a * f - c * e) / det;
    const mx = (x3 + x1) / 2;
    const my = (y3 + y1) / 2;
    const direction = _ArcCurve.isLeft(
      _ArcCurve.tempVector1.set(x1, y1),
      _ArcCurve.tempVector2.set(x3, y3),
      _ArcCurve.tempVector3.set(rx, ry)
    );
    const vertical = _ArcCurve.tempVector1.set(rx, ry).sub(_ArcCurve.tempVector2.set(mx, my)).length() * (direction ? -1 : 1);
    this.start.set(startX, startY);
    this.end.set(endX, endY);
    this.vertical = vertical;
    const start = this.start;
    const end = this.end;
    const center = this.center.copy(this.end).sub(this.start);
    const mid = this.mid.set(mx, my);
    center.set(-center.y, center.x).negate().normalize().multiplyScalar(vertical).add(mid);
    this.aX = center.x;
    this.aY = center.y;
    const tempVector1 = _ArcCurve.tempVector1;
    this.xRadius = tempVector1.copy(end).sub(center).length();
    this.yRadius = this.xRadius;
    this.aStartAngle = tempVector1.copy(start).sub(center).angle();
    this.aEndAngle = tempVector1.copy(end).sub(center).angle();
    const midPoint3 = _ArcCurve.tempVector2.set(x2, y2).sub(mid);
    const midRadius = _ArcCurve.tempVector3.set(rx, ry).sub(mid);
    this.aClockwise = (direction ? 1 : -1) * (_ArcCurve.isSameDirecton(midPoint3, midRadius) ? 1 : -1) < 0 ? false : true;
  }
};
let ArcCurve = _ArcCurve;
__publicField(ArcCurve, "isLeft", function(a, b, c) {
  return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x) > 0;
});
__publicField(ArcCurve, "isSameDirecton", function(vect1, vect2) {
  const denominator = Math.sqrt(vect1.lengthSq() * vect2.lengthSq());
  if (denominator === 0) {
    return false;
  }
  const theta = vect1.dot(vect2) / denominator;
  return Math.acos(MathUtils.clamp(theta, -1, 1)) < Math.PI / 2;
});
__publicField(ArcCurve, "tempVector1", new Vector2());
__publicField(ArcCurve, "tempVector2", new Vector2());
__publicField(ArcCurve, "tempVector3", new Vector2());
const pathCurveMap$1 = {
  arc: (startX, startY, ctrlX, ctrlY, endX, endY) => {
    return new ArcCurve(startX, startY, ctrlX, ctrlY, endX, endY);
  },
  line: (startX, startY, endX, endY) => new LineCurve(new Vector2(startX, startY), new Vector2(endX, endY)),
  bezier: (startX, startY, aCP1x, aCP1y, aCP2x, aCP2y, endX, endY) => new CubicBezierCurve(
    new Vector2(startX, startY),
    new Vector2(aCP1x, aCP1y),
    new Vector2(aCP2x, aCP2y),
    new Vector2(endX, endY)
  ),
  cubic: (startX, startY, aCP1x, aCP1y, aCP2x, aCP2y, endX, endY) => new CubicBezierCurve(
    new Vector2(startX, startY),
    new Vector2(aCP1x, aCP1y),
    new Vector2(aCP2x, aCP2y),
    new Vector2(endX, endY)
  ),
  quadratic: (startX, startY, aCPx, aCPy, endX, endY) => new QuadraticBezierCurve(
    new Vector2(startX, startY),
    new Vector2(aCPx, aCPy),
    new Vector2(endX, endY)
  )
};
const getCurveExtrPoint$1 = function(curve, extr) {
  return extr === "start" ? { x: curve.params[0], y: curve.params[1] } : {
    x: curve.params[curve.params.length - 2],
    y: curve.params[curve.params.length - 1]
  };
};
const generateCurve$1 = function(segment) {
  if (!pathCurveMap$1[segment.curve]) {
    console.warn(`path processor can not support this curve: ${segment.curve}`);
    return null;
  }
  return pathCurveMap$1[segment.curve](...segment.params);
};
const syncExtrParams$1 = function(config, params, extr) {
  if (extr === "start") {
    config.params[0] !== params[0] && (config.params[0] = params[0]);
    config.params[1] !== params[1] && (config.params[1] = params[1]);
  } else {
    const range = config.params.length - 1;
    config.params[range - 1] !== params[0] && (config.params[range - 1] = params[0]);
    config.params[range] !== params[1] && (config.params[range] = params[1]);
  }
};
var PathProcessor = defineProcessor({
  type: "Path",
  config: getPathConfig,
  commands: {
    add: {
      curves({ target, config, value }) {
        const curve = generateCurve$1(value);
        curve && target.curves.push(curve);
      }
    },
    set: {
      curves({ target, config, path, key }) {
        let index2 = Number(path[1]);
        if (!Number.isInteger(index2)) {
          if (Number.isInteger(Number(key))) {
            return;
          }
          console.warn(`path processor: set curves path error:`, path);
          return;
        }
        const currentCurve = generateCurve$1(config.curves[index2]);
        target.curves[index2] = currentCurve;
        const startPoint = getCurveExtrPoint$1(config.curves[index2], "start");
        const endPoint = getCurveExtrPoint$1(config.curves[index2], "end");
        if (index2 - 1 >= 0) {
          syncExtrParams$1(
            config.curves[index2 - 1],
            [startPoint.x, startPoint.y],
            "end"
          );
        }
        if (index2 + 1 <= config.curves.length - 1) {
          syncExtrParams$1(
            config.curves[index2 + 1],
            [endPoint.x, endPoint.y],
            "start"
          );
        }
      }
    },
    delete: {
      curves({ target, config, key }) {
        const index2 = Number(key);
        if (target.curves.length - 1 < index2) {
          return;
        }
        target.curves.splice(index2, 1);
        if (index2 <= config.curves.length - 1 && index2 - 1 >= 0) {
          const endPoint = getCurveExtrPoint$1(config.curves[index2 - 1], "end");
          syncExtrParams$1(
            config.curves[index2],
            [endPoint.x, endPoint.y],
            "start"
          );
        }
      }
    }
  },
  create(config, engine) {
    const path = new Path();
    if (config.curves.length) {
      for (const segment of config.curves) {
        const curve = generateCurve$1(segment);
        curve && path.curves.push(curve);
      }
    }
    path.autoClose = config.autoClose;
    return path;
  },
  dispose(target) {
    target.curves = [];
  }
});
const pathCurveMap = {
  line: (startX, startY, startZ, endX, endY, endZ) => new LineCurve3(
    new Vector3(startX, startY, startZ),
    new Vector3(endX, endY, endZ)
  ),
  cubic: (startX, startY, startZ, aCP1x, aCP1y, aCP1z, aCP2x, aCP2y, aCP2z, endX, endY, endZ) => new CubicBezierCurve3(
    new Vector3(startX, startY, startZ),
    new Vector3(aCP1x, aCP1y, aCP1z),
    new Vector3(aCP2x, aCP2y, aCP2z),
    new Vector3(endX, endY, endZ)
  ),
  quadratic: (startX, startY, startZ, aCPx, aCPy, aCPz, endX, endY, endZ) => new QuadraticBezierCurve3(
    new Vector3(startX, startY, startZ),
    new Vector3(aCPx, aCPy, aCPz),
    new Vector3(endX, endY, endZ)
  )
};
const getCurveExtrPoint = function(curve, extr) {
  return extr === "start" ? {
    x: curve.params[0],
    y: curve.params[1],
    z: curve.params[2]
  } : {
    x: curve.params[curve.params.length - 3],
    y: curve.params[curve.params.length - 2],
    z: curve.params[curve.params.length - 1]
  };
};
const generateCurve = function(segment) {
  if (!pathCurveMap[segment.curve]) {
    console.warn(
      `path3 processor can not support this curve: ${segment.curve}`
    );
    return null;
  }
  return pathCurveMap[segment.curve](...segment.params);
};
const syncExtrParams = function(config, params, extr) {
  if (extr === "start") {
    config.params[0] !== params[0] && (config.params[0] = params[0]);
    config.params[1] !== params[1] && (config.params[1] = params[1]);
    config.params[2] !== params[2] && (config.params[2] = params[2]);
  } else {
    const range = config.params.length - 1;
    config.params[range - 2] !== params[0] && (config.params[range - 2] = params[0]);
    config.params[range - 1] !== params[1] && (config.params[range - 1] = params[1]);
    config.params[range] !== params[2] && (config.params[range] = params[2]);
  }
};
var Path3Processor = defineProcessor({
  type: "Path3",
  config: getPath3Config,
  commands: {
    add: {
      curves({ target, config, value }) {
        const curve = generateCurve(value);
        curve && target.curves.push(curve);
      }
    },
    set: {
      curves({ target, config, path, key }) {
        let index2 = Number(path[1]);
        if (!Number.isInteger(index2)) {
          if (Number.isInteger(Number(key))) {
            return;
          }
          console.warn(`path3 processor: set curves path error:`, path);
          return;
        }
        const currentCurve = generateCurve(config.curves[index2]);
        target.curves[index2] = currentCurve;
        const startPoint = getCurveExtrPoint(config.curves[index2], "start");
        const endPoint = getCurveExtrPoint(config.curves[index2], "end");
        if (index2 - 1 >= 0) {
          syncExtrParams(
            config.curves[index2 - 1],
            [startPoint.x, startPoint.y, startPoint.z],
            "end"
          );
        }
        if (index2 + 1 <= config.curves.length - 1) {
          syncExtrParams(
            config.curves[index2 + 1],
            [endPoint.x, endPoint.y, endPoint.z],
            "start"
          );
        }
      }
    },
    delete: {
      curves({ target, config, key }) {
        const index2 = Number(key);
        if (target.curves.length - 1 < index2) {
          return;
        }
        target.curves.splice(index2, 1);
        if (index2 <= config.curves.length - 1 && index2 - 1 >= 0) {
          const endPoint = getCurveExtrPoint(config.curves[index2 - 1], "end");
          syncExtrParams(
            config.curves[index2],
            [endPoint.x, endPoint.y, endPoint.z],
            "start"
          );
        }
      }
    }
  },
  create(config, engine) {
    const path = new Path();
    if (config.curves.length) {
      for (const segment of config.curves) {
        const curve = generateCurve(segment);
        curve && path.curves.push(curve);
      }
    }
    path.autoClose = config.autoClose;
    return path;
  },
  dispose(target) {
    target.curves = [];
  }
});
var index = {
  type: "path",
  compiler: PathCompiler,
  rule: PathRule,
  processors: [PathProcessor, Path3Processor],
  lifeOrder: SUPPORT_LIFE_CYCLE.ZERO
};
export { PathCompiler, index as default, getPath3Config, getPathConfig };
