import { defineProcessor, EngineSupport } from "@vis-three/middleware";
import { PathCompiler } from "../PathCompiler";
import { getPathConfig, PathConfig, SegmentConfig } from "../PathConfig";
import {
  CubicBezierCurve,
  Curve,
  EllipseCurve,
  LineCurve,
  Path,
  QuadraticBezierCurve,
  Vector2,
} from "three";
import { ArcCurve } from "@vis-three/module-curve";

const pathCurveMap = {
  arc: (
    startX: number,
    startY: number,
    vertical: number,
    clockwise: boolean,
    endX: number,
    endY: number
  ) => {
    return new ArcCurve(startX, startY, vertical, clockwise, endX, endY);
  },
  // ellipse: (
  //   startX: number,
  //   startY: number,
  //   aX: number,
  //   aY: number,
  //   xRadius: number,
  //   yRadius: number,
  //   aStartAngle: number,
  //   aEndAngle: number,
  //   aClockwise: boolean,
  //   aRotation: number
  // ) =>
  //   new EllipseCurve(
  //     startX + aX,
  //     startY + aY,
  //     xRadius,
  //     yRadius,
  //     aStartAngle,
  //     aEndAngle,
  //     aClockwise,
  //     aRotation
  //   ),
  line: (startX: number, startY: number, endX: number, endY: number) =>
    new LineCurve(new Vector2(startX, startY), new Vector2(endX, endY)),
  bezier: (
    startX: number,
    startY: number,
    aCP1x: number,
    aCP1y: number,
    aCP2x: number,
    aCP2y: number,
    endX: number,
    endY: number
  ) =>
    new CubicBezierCurve(
      new Vector2(startX, startY),
      new Vector2(aCP1x, aCP1y),
      new Vector2(aCP2x, aCP2y),
      new Vector2(endX, endY)
    ),
  quadratic: (
    startX: number,
    startY: number,
    aCPx: number,
    aCPy: number,
    endX: number,
    endY: number
  ) =>
    new QuadraticBezierCurve(
      new Vector2(startX, startY),
      new Vector2(aCPx, aCPy),
      new Vector2(endX, endY)
    ),
};

const getCurveExtrPoint = function (
  curve: SegmentConfig,
  extr: "start" | "end"
) {
  return extr === "start"
    ? { x: curve.params[0], y: curve.params[1] }
    : {
        x: curve.params[curve.params.length - 2],
        y: curve.params[curve.params.length - 1],
      };
};

const generateCurve = function (segment: SegmentConfig) {
  if (!pathCurveMap[segment.curve]) {
    console.warn(`path processor can not support this curve: ${segment.curve}`);
    return null;
  }
  return pathCurveMap[segment.curve](...segment.params);
};

const syncExtrParams = function (
  config: SegmentConfig,
  params: number[],
  extr: "start" | "end"
) {
  if (extr === "start") {
    config.params[0] !== params[0] && (config.params[0] = params[0]);
    config.params[1] !== params[1] && (config.params[1] = params[1]);
  } else {
    const range = config.params.length - 1;
    config.params[range - 1] !== params[0] &&
      (config.params[range - 1] = params[0]);
    config.params[range] !== params[1] && (config.params[range] = params[1]);
  }
};

export default defineProcessor<PathConfig, Path, EngineSupport, PathCompiler>({
  type: "Path",
  config: getPathConfig,
  commands: {
    add: {
      curves({ target, config, value }) {
        const curve = generateCurve(value);
        curve && target.curves.push(curve);
      },
    },
    set: {
      curves({ target, config, path, key }) {
        let index = Number(path[1]);

        if (!Number.isInteger(index)) {
          if (Number.isInteger(Number(key))) {
            return;
          }
          console.warn(`path processor: set curves path error:`, path);
          return;
        }

        const currentCurve = generateCurve(config.curves[index]);

        target.curves[index] = currentCurve;

        const startPoint = getCurveExtrPoint(config.curves[index], "start");
        const endPoint = getCurveExtrPoint(config.curves[index], "end");

        if (index - 1 >= 0) {
          syncExtrParams(
            config.curves[index - 1],
            [startPoint.x, startPoint.y],
            "end"
          );
        }

        if (index + 1 <= config.curves.length - 1) {
          syncExtrParams(
            config.curves[index + 1],
            [endPoint.x, endPoint.y],
            "start"
          );
        }
      },
    },
    delete: {
      curves({ target, config, key }) {
        const index = Number(key);

        if (target.curves.length - 1 < index) {
          return;
        }

        target.curves.splice(index, 1);

        if (index <= config.curves.length - 1 && index - 1 >= 0) {
          const endPoint = getCurveExtrPoint(config.curves[index - 1], "end");
          syncExtrParams(
            config.curves[index],
            [endPoint.x, endPoint.y],
            "start"
          );
        }
      },
    },
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
  },
});
