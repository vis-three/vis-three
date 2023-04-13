import { Compiler, Rule, getSymbolConfig, defineProcessor, SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { validate } from "uuid";
import { Path, LineCurve, Vector2, CubicBezierCurve, QuadraticBezierCurve } from "three";
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
const pathCurveMap = {
  line: (startX, startY, endX, endY) => new LineCurve(new Vector2(startX, startY), new Vector2(endX, endY)),
  bezier: (startX, startY, aCP1x, aCP1y, aCP2x, aCP2y, endX, endY) => new CubicBezierCurve(
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
const getCurveExtrPoint = function(curve, extr) {
  return extr === "start" ? curve.getPoint(0) : curve.getPoint(1);
};
const curveParamsExtrMap = {
  line: {
    start: [0, 1],
    end: [2, 3]
  },
  bezier: {
    start: [0, 1],
    end: [6, 7]
  },
  quadratic: {
    start: [0, 1],
    end: [4, 5]
  }
};
const generateCurve = function(segment) {
  if (!pathCurveMap[segment.curve]) {
    console.warn(`path processor can not support this curve: ${segment.curve}`);
    return null;
  }
  return pathCurveMap[segment.curve](...segment.params);
};
const syncExtrParams = function(config, params, extr) {
  if (!curveParamsExtrMap[config.curve]) {
    console.warn(`can not support this curve: ${config.curve}`);
    return;
  }
  curveParamsExtrMap[config.curve][extr].forEach((index2, i) => {
    if (params[i] !== config.params[index2]) {
      config.params[index2] = params[i];
    }
  });
};
var PathProcessor = defineProcessor({
  type: "Path",
  config: getPathConfig,
  commands: {
    add: {
      curves({ target, config, value }) {
        const curve = generateCurve(value);
        curve && target.curves.push(curve);
      }
    },
    set: {
      curves({ target, config, path }) {
        const index2 = Number(path[1]);
        if (!Number.isInteger(index2)) {
          console.warn(`path processor: set curves path error:`, path);
          return;
        }
        const currentCurve = generateCurve(config.curves[index2]);
        target.curves[index2] = currentCurve;
        const startPoint = getCurveExtrPoint(currentCurve, "start");
        const endPoint = getCurveExtrPoint(currentCurve, "end");
        if (index2 - 1 >= 0) {
          syncExtrParams(
            config.curves[index2 - 1],
            [startPoint.x, startPoint.y],
            "end"
          );
        }
        if (index2 + 1 <= target.curves.length - 1) {
          syncExtrParams(
            config.curves[index2 + 1],
            [endPoint.x, endPoint.y],
            "start"
          );
        }
      }
    },
    delete: {
      curves({ target, value }) {
        if (target.curves.length - 1 < value) {
          return;
        }
        target.curves.splice(value, target.curves.length);
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
  processors: [PathProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.ZERO
};
export { index as default };
