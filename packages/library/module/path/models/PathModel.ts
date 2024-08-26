import { defineModel } from "@vis-three/tdcm";
import {
  CubicBezierCurve,
  Curve,
  LineCurve,
  Path,
  QuadraticBezierCurve,
  Vector2,
} from "three";
import { getPathConfig, PathConfig, SegmentConfig } from "../PathConfig";
import { ArcCurve } from "../extends/ArcCurve";

export default defineModel<
  PathConfig,
  Path,
  {},
  {
    getCurveExtrPoint: (
      curve: SegmentConfig,
      extr: "start" | "end"
    ) => {
      x: number;
      y: number;
    };
    generateCurve: (segment: SegmentConfig) => Curve<Vector2>;
    syncExtrParams: (
      config: SegmentConfig,
      params: number[],
      extr: "start" | "end"
    ) => void;
  }
>({
  type: "Path",
  config: getPathConfig,
  shared: {
    getCurveExtrPoint(curve: SegmentConfig, extr: "start" | "end") {
      return extr === "start"
        ? { x: curve.params[0] as number, y: curve.params[1] as number }
        : {
            x: curve.params[curve.params.length - 2] as number,
            y: curve.params[curve.params.length - 1] as number,
          };
    },
    generateCurve(segment: SegmentConfig) {
      const pathCurveMap = {
        arc: (
          startX: number,
          startY: number,
          ctrlX: number,
          ctrlY: number,
          endX: number,
          endY: number
        ) => {
          return new ArcCurve(startX, startY, ctrlX, ctrlY, endX, endY);
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
        cubic: (
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

      if (!pathCurveMap[segment.curve]) {
        console.warn(
          `path processor can not support this curve: ${segment.curve}`
        );
        return null;
      }
      return pathCurveMap[segment.curve](...segment.params);
    },
    syncExtrParams(
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
        config.params[range] !== params[1] &&
          (config.params[range] = params[1]);
      }
    },
  },
  commands: {
    add: {
      curves({ model, target, config, value }) {
        const curve = model.generateCurve(value);
        curve && target.curves.push(curve);
      },
    },
    set: {
      curves({ model, target, config, path, key }) {
        let index = Number(path[1]);

        if (!Number.isInteger(index)) {
          if (Number.isInteger(Number(key))) {
            return;
          }
          console.warn(`path processor: set curves path error:`, path);
          return;
        }

        const currentCurve = model.generateCurve(config.curves[index]);

        target.curves[index] = currentCurve;

        const startPoint = model.getCurveExtrPoint(
          config.curves[index],
          "start"
        );
        const endPoint = model.getCurveExtrPoint(config.curves[index], "end");

        if (index - 1 >= 0) {
          model.syncExtrParams(
            config.curves[index - 1],
            [startPoint.x, startPoint.y],
            "end"
          );
        }

        if (index + 1 <= config.curves.length - 1) {
          model.syncExtrParams(
            config.curves[index + 1],
            [endPoint.x, endPoint.y],
            "start"
          );
        }
      },
    },
    delete: {
      curves({ model, target, config, key }) {
        const index = Number(key);

        if (target.curves.length - 1 < index) {
          return;
        }

        target.curves.splice(index, 1);

        if (index <= config.curves.length - 1 && index - 1 >= 0) {
          const endPoint = model.getCurveExtrPoint(
            config.curves[index - 1],
            "end"
          );
          model.syncExtrParams(
            config.curves[index],
            [endPoint.x, endPoint.y],
            "start"
          );
        }
      },
    },
  },
  create({ model, config, engine }) {
    const path = new Path();

    if (config.curves.length) {
      for (const segment of config.curves) {
        const curve = model.generateCurve(segment);
        curve && path.curves.push(curve);
      }
    }

    path.autoClose = config.autoClose;

    return path;
  },
  dispose({ target }) {
    target.curves = [];
  },
});
