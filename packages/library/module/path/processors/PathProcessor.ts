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
      curves({ target, config, value }) {
        if (config.curves.length === 1) {
          target.moveTo(value.params[0], value.params[1]);
          return;
        }
        if (!generateCurve(target, value)) {
          console.warn(
            `path processor can not support this curve: ${value.curve}`
          );
        }
      },
    },
    set: {
      curves({ target, config, path }) {
        const index = Number(path[1]);

        if (!Number.isInteger(index)) {
          console.warn(`path processor: set curves path error:`, path);
          return;
        }

        const previous = target.curves[index - 1];

        target.currentPoint.copy(previous.getPoint(1));

        const segmentList = config.curves.slice(index);

        target.curves.splice(index, target.curves.length);

        for (const segment of segmentList) {
          generateCurve(target, segment);
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
      for (let index = 0; index < config.curves.length; index += 1) {
        const segment = config.curves[index];
        if (index === 0) {
          path.moveTo(segment.params[0], segment.params[1]);
          continue;
        }

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
