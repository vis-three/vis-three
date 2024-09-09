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
    // 由于 geometryModel的更新是靠调用create和dispose进行，避免事件丢失，需要进行储存
    cachePathEvent?: () => void;
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
      if (model.pathEvent) {
        model.cachePathEvent = model.pathEvent;
      }
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
    if (model.pathEvent) {
      model
        .toModel(config.path)
        ?.off(MODEL_EVENT.COMPILED_UPDATE, model.pathEvent);

      if (model.cachePathEvent) {
        model.pathEvent = model.cachePathEvent;
        model.cachePathEvent = undefined;
      }
    }
    geometryModel.dispose!(target);
  },
}));
