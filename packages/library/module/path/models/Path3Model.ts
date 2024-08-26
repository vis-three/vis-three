import { defineModel } from "@vis-three/tdcm";
import {
  CubicBezierCurve3,
  Curve,
  CurvePath,
  LineCurve3,
  QuadraticBezierCurve3,
  Vector3,
} from "three";
import { getPath3Config, PathConfig, SegmentConfig } from "../PathConfig";

export default defineModel<
  PathConfig,
  CurvePath<Vector3>,
  {},
  {
    getCurveExtrPoint: (
      curve: SegmentConfig,
      extr: "start" | "end"
    ) => {
      x: number;
      y: number;
      z: number;
    };
    generateCurve: (segment: SegmentConfig) => Curve<Vector3>;
    syncExtrParams: (
      config: SegmentConfig,
      params: number[],
      extr: "start" | "end"
    ) => void;
  }
>({
  type: "Path3",
  config: getPath3Config,
  shared: {
    getCurveExtrPoint(curve: SegmentConfig, extr: "start" | "end") {
      return extr === "start"
        ? {
            x: curve.params[0],
            y: curve.params[1],
            z: curve.params[2],
          }
        : {
            x: curve.params[curve.params.length - 3],
            y: curve.params[curve.params.length - 2],
            z: curve.params[curve.params.length - 1],
          };
    },
    generateCurve(segment: SegmentConfig) {
      const pathCurveMap = {
        line: (
          startX: number,
          startY: number,
          startZ: number,
          endX: number,
          endY: number,
          endZ: number
        ) =>
          new LineCurve3(
            new Vector3(startX, startY, startZ),
            new Vector3(endX, endY, endZ)
          ),
        cubic: (
          startX: number,
          startY: number,
          startZ: number,
          aCP1x: number,
          aCP1y: number,
          aCP1z: number,
          aCP2x: number,
          aCP2y: number,
          aCP2z: number,
          endX: number,
          endY: number,
          endZ: number
        ) =>
          new CubicBezierCurve3(
            new Vector3(startX, startY, startZ),
            new Vector3(aCP1x, aCP1y, aCP1z),
            new Vector3(aCP2x, aCP2y, aCP2z),
            new Vector3(endX, endY, endZ)
          ),
        quadratic: (
          startX: number,
          startY: number,
          startZ: number,
          aCPx: number,
          aCPy: number,
          aCPz: number,
          endX: number,
          endY: number,
          endZ: number
        ) =>
          new QuadraticBezierCurve3(
            new Vector3(startX, startY, startZ),
            new Vector3(aCPx, aCPy, aCPz),
            new Vector3(endX, endY, endZ)
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
        config.params[2] !== params[2] && (config.params[2] = params[2]);
      } else {
        const range = config.params.length - 1;
        config.params[range - 2] !== params[0] &&
          (config.params[range - 2] = params[0]);
        config.params[range - 1] !== params[1] &&
          (config.params[range - 1] = params[1]);
        config.params[range] !== params[2] &&
          (config.params[range] = params[2]);
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
          console.warn(`path3 processor: set curves path error:`, path);
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
            [startPoint.x, startPoint.y, startPoint.z],
            "end"
          );
        }

        if (index + 1 <= config.curves.length - 1) {
          model.syncExtrParams(
            config.curves[index + 1],
            [endPoint.x, endPoint.y, endPoint.z],
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
            [endPoint.x, endPoint.y, endPoint.z],
            "start"
          );
        }
      },
    },
  },
  create({ model, config, engine }) {
    const path = new CurvePath<Vector3>();

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
