import { Curve, ExtrudeGeometry, Shape, Vector3 } from "three";
import { getExtrudeGeometryConfig } from "../GeometryConfig";
import { ExtrudeGeometryConfig } from "../GeometryInterface";
import { defineGeometryModel } from "./common";
import { MODEL_EVENT, MODULE_TYPE } from "@vis-three/tdcm";
import { ExtrudeUVGenerator } from "../extends";

export default defineGeometryModel<
  ExtrudeGeometryConfig,
  ExtrudeGeometry,
  { shapeEvent?: () => void; pathEvent?: () => void }
>((geometryModel) => ({
  type: "ExtrudeGeometry",
  config: getExtrudeGeometryConfig,
  context({ model }) {
    return {
      shapeEvent: undefined,
      pathEvent: undefined,
    };
  },
  create({ model, config, engine }) {
    const shape =
      (engine.compilerManager.getObjectFromModule(
        MODULE_TYPE.SHAPE,
        config.shapes
      ) as Shape) || undefined;

    const extrudePath =
      (engine.compilerManager.getObjectFromModule(
        MODULE_TYPE.PATH,
        config.options.extrudePath
      ) as Curve<Vector3>) || undefined;

    const geometry = new ExtrudeGeometry(
      shape,
      Object.assign({}, config.options, {
        extrudePath,
        UVGenerator:
          ExtrudeUVGenerator[config.options.UVGenerator || "default"],
      })
    );

    if (shape) {
      model.shapeEvent = () => {
        config.shapes = config.shapes;
      };
      model
        .toModel(config.shapes)
        ?.on(MODEL_EVENT.COMPILED_UPDATE, model.shapeEvent);
    }

    if (extrudePath) {
      model.pathEvent = () => {
        config.options.extrudePath = config.options.extrudePath;
      };

      model
        .toModel(config.options.extrudePath)
        ?.on(MODEL_EVENT.COMPILED_UPDATE, model.pathEvent);
    }

    return geometryModel.create!(geometry, config);
  },
  dispose({ model, config, target }) {
    model.shapeEvent &&
      model
        .toModel(config.shapes)
        ?.off(MODEL_EVENT.COMPILED_UPDATE, model.shapeEvent);

    model.pathEvent &&
      model
        .toModel(config.options.extrudePath)
        ?.off(MODEL_EVENT.COMPILED_UPDATE, model.pathEvent);

    geometryModel.dispose!(target);
  },
}));
