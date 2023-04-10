import { Compiler, Rule, getSymbolConfig, defineProcessor, SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { validate } from "uuid";
import { Path } from "three";
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
  arc: "arc",
  ellipse: "ellipse",
  line: "lineTo",
  bezier: "bezierCurveTo",
  quadratic: "quadraticCurveTo"
};
const generateCurve = function(path, segment) {
  if (!path.curves.length) {
    path.moveTo(segment.params[0], segment.params[1]);
    return true;
  }
  if (!pathCurveMap[segment.curve]) {
    console.warn(`path processor can not support this curve: ${segment.curve}`);
    return false;
  }
  path[pathCurveMap[segment.curve]](...segment.params);
  return true;
};
var PathProcessor = defineProcessor({
  type: "Path",
  config: getPathConfig,
  commands: {
    add: {
      curves({ target, value }) {
        if (!generateCurve(target, value)) {
          console.warn(
            `path processor can not support this curve: ${value.curve}`
          );
        }
      }
    },
    set: {
      curves({ target, config, path }) {
        const index2 = Number(path[1]);
        if (!Number.isInteger(index2)) {
          console.warn(`path processor: set curves path error:`, path);
          return;
        }
        const previous = target.curves[index2 - 1];
        target.currentPoint.copy(previous.getPoint(1));
        const segmentList = config.curves.slice(index2);
        target.curves.splice(index2, target.curves.length);
        for (const segment of segmentList) {
          generateCurve(target, segment);
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
    if (path.curves.length) {
      for (const segment of config.curves) {
        if (!generateCurve(path, segment)) {
          console.warn(
            `path processor can not support this curve: ${segment.curve}`
          );
          continue;
        }
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
