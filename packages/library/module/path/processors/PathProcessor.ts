import { defineProcessor, EngineSupport } from "@vis-three/middleware";
import { PathCompiler } from "../PathCompiler";
import { getPathConfig, PathConfig, SegmentConfig } from "../PathConfig";
import { Path } from "three";

const pathCurveMap = {
  arc: "arc",
  ellipse: "ellipse",
  line: "lineTo",
  bezier: "bezierCurveTo",
  quadratic: "quadraticCurveTo",
};

const generateCurve = function (path: Path, segment: SegmentConfig) {
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

export default defineProcessor<PathConfig, Path, EngineSupport, PathCompiler>({
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
      },
    },
    set: {
      curves({ target, config, path }) {
        let index = path[1] as unknown as number;

        if (!Number.isInteger(Number(index))) {
          console.warn(`path processor: set curves path error:`, path);
          return;
        }

        index = Number(index);

        const segmentList = config.curves.slice(index);

        target.curves.splice(index, target.curves.length);

        for (const segment of segmentList) {
          if (!generateCurve(target, segment)) {
            console.warn(
              `path processor can not support this curve: ${segment.curve}`
            );
            continue;
          }
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
  },
});
