import { BoxGeometry, Path } from "three";
import {
  getBoxGeometryConfig,
  getPathTubeGeometryConfig,
} from "../GeometryConfig";
import {
  BoxGeometryConfig,
  PathTubeGeometryConfig,
} from "../GeometryInterface";
import { defineGeometryModel } from "./common";
import { PathTubeGeometry } from "../extends";
import { MODEL_EVENT, MODULE_TYPE } from "@vis-three/tdcm";

export default defineGeometryModel<
  PathTubeGeometryConfig,
  PathTubeGeometry,
  {
    pathEvent?: () => void;
    restrictor: number;
  }
>((geometryModel) => ({
  type: "PathTubeGeometry",
  config: getPathTubeGeometryConfig,
  context() {
    return {
      pathEvent: undefined,
      restrictor: 0,
    };
  },
  create({ model, config, engine }) {
    const path =
      (engine.compilerManager.getObjectFromModule(
        MODULE_TYPE.PATH,
        config.path
      ) as Path) || undefined;

    const geometry = new PathTubeGeometry(
      path,
      config.tubularSegments,
      config.radius,
      config.radialSegments,
      config.closed
    );

    if (path) {
      model.pathEvent = () => {
        if (model.restrictor) {
          return;
        }

        model.restrictor = window.setTimeout(() => {
          config.path = config.path;
          model.restrictor = 0;
        }, 1000 / 30);
      };

      model
        .toModel(config.path)
        ?.on(MODEL_EVENT.COMPILED_UPDATE, model.pathEvent);
    }

    return geometryModel.create!(geometry, config);
  },
  dispose({ model, config, target }) {
    window.clearTimeout(model.restrictor);

    model.pathEvent &&
      model
        .toModel(config.path)
        ?.off(MODEL_EVENT.COMPILED_UPDATE, model.pathEvent);

    geometryModel.dispose!(target);
  },
}));
