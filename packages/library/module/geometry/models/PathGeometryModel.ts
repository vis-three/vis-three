import { BoxGeometry, Path } from "three";
import { getBoxGeometryConfig, getPathGeometryConfig } from "../GeometryConfig";
import { BoxGeometryConfig, PathGeometryConfig } from "../GeometryInterface";
import { defineGeometryModel } from "./common";
import { PathGeometry } from "../extends";
import { MODEL_EVENT, MODULE_TYPE } from "@vis-three/tdcm";

export default defineGeometryModel<
  PathGeometryConfig,
  PathGeometry,
  {
    pathEvent?: () => void;
  }
>((geometryModel) => ({
  type: "PathGeometry",
  config: getPathGeometryConfig,
  create({ model, config, engine }) {
    const path =
      (engine.compilerManager.getObjectFromModule(
        MODULE_TYPE.PATH,
        config.path
      ) as Path) || undefined;

    const geometry = new PathGeometry(path, config.divisions, config.space);

    if (path) {
      model.pathEvent = () => {
        config.path = config.path;
      };
      model
        .toModel(config.path)
        ?.on(MODEL_EVENT.COMPILED_UPDATE, model.pathEvent);
    }

    return geometryModel.create!(geometry, config);
  },
  dispose({ model, config, target }) {
    model.pathEvent &&
      model
        .toModel(config.path)
        ?.off(MODEL_EVENT.COMPILED_UPDATE, model.pathEvent);

    geometryModel.dispose!(target);
  },
}));
