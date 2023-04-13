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

// TODO: 通过起始点去反推圆形和椭圆的参数
const pathCurveMap = {
  // arc: (
  //   startX: number,
  //   startY: number,
  //   aX: number,
  //   aY: number,
  //   aRadius: number,
  //   aStartAngle: number,
  //   aEndAngle: number,
  //   aClockwise: boolean
  // ) =>
  //   new EllipseCurve(
  //     startX + aX,
  //     startY + aY,
  //     aRadius,
  //     aRadius,
  //     aStartAngle,
  //     aEndAngle,
  //     aClockwise,
  //     0
  //   ),
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
  curve: Curve<Vector2>,
  extr: "start" | "end"
) {
  return extr === "start" ? curve.getPoint(0) : curve.getPoint(1);
};

const curveParamsExtrMap = {
  // arc: {
  //   start: [0, 1],
  //   end: (curve: Curve<Vector2>) => getCurveExtrPoint(curve, "end"),
  // },
  // ellipse: {
  //   start: [0, 1],
  //   end: (curve: Curve<Vector2>) => getCurveExtrPoint(curve, "end"),
  // },
  line: {
    start: [0, 1],
    end: [2, 3],
  },
  bezier: {
    start: [0, 1],
    end: [6, 7],
  },
  quadratic: {
    start: [0, 1],
    end: [4, 5],
  },
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
  if (!curveParamsExtrMap[config.curve]) {
    console.warn(`can not support this curve: ${config.curve}`);
    return;
  }
  curveParamsExtrMap[config.curve][extr].forEach((index: number, i: number) => {
    if (params[i] !== config.params[index]) {
      config.params[index] = params[i];
    }
  });
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
      curves({ target, config, path }) {
        const index = Number(path[1]);

        if (!Number.isInteger(index)) {
          console.warn(`path processor: set curves path error:`, path);
          return;
        }

        const currentCurve = generateCurve(config.curves[index]);

        target.curves[index] = currentCurve;

        const startPoint = getCurveExtrPoint(currentCurve, "start");
        const endPoint = getCurveExtrPoint(currentCurve, "end");

        if (index - 1 >= 0) {
          syncExtrParams(
            config.curves[index - 1],
            [startPoint.x, startPoint.y],
            "end"
          );
        }

        if (index + 1 <= target.curves.length - 1) {
          syncExtrParams(
            config.curves[index + 1],
            [endPoint.x, endPoint.y],
            "start"
          );
        }
      },
    },
    delete: {
      curves({ target, value }) {
        if (target.curves.length - 1 < value) {
          return;
        }

        target.curves.splice(value, target.curves.length);
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
