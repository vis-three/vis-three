import { LatheGeometry, Path } from "three";
import { getLatheGeometryConfig } from "../GeometryConfig";
import { LatheGeometryConfig } from "../GeometryInterface";
import { defineGeometryModel } from "./common";
import { MODEL_EVENT, MODULE_TYPE } from "@vis-three/tdcm";

export default defineGeometryModel<
  LatheGeometryConfig,
  LatheGeometry,
  {
    pathEvent?: () => void;
  }
>((geometryModel) => ({
  type: "LatheGeometry",
  config: getLatheGeometryConfig,
  context({ model }) {
    return {
      pathEvent: undefined,
    };
  },
  create({ model, config, engine }) {
    const path =
      (engine.compilerManager.getObjectFromModule(
        MODULE_TYPE.PATH,
        config.path
      ) as Path) || undefined;

    const geometry = new LatheGeometry(
      path ? path.getPoints(config.divisions) : undefined,
      config.segments,
      config.phiStart,
      config.phiLength
    );

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
