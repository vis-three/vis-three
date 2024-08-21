import { BoxGeometry, Shape, ShapeGeometry } from "three";
import {
  getBoxGeometryConfig,
  getShapeGeometryConfig,
} from "../GeometryConfig";
import { BoxGeometryConfig, ShapeGeometryConfig } from "../GeometryInterface";
import { defineGeometryModel } from "./common";
import { MODEL_EVENT, MODULE_TYPE } from "@vis-three/tdcm";

export default defineGeometryModel<
  ShapeGeometryConfig,
  ShapeGeometry,
  {
    shapeEvent?: () => void;
  }
>((geometryModel) => ({
  type: "ShapeGeometry",
  config: getShapeGeometryConfig,
  create({ model, config, engine }) {
    const shape =
      (engine.compilerManager.getObjectFromModule(
        MODULE_TYPE.SHAPE,
        config.shape
      ) as Shape) || undefined;

    const geometry = new ShapeGeometry(shape, config.curveSegments);

    if (shape) {
      model.shapeEvent = () => {
        config.shape = config.shape;
      };
      model
        .toModel(config.shape)
        ?.on(MODEL_EVENT.COMPILED_UPDATE, model.shapeEvent);
    }

    return geometryModel.create!(geometry, config);
  },
  dispose({ model, config, target }) {
    model.shapeEvent &&
      model
        .toModel(config.shape)
        ?.on(MODEL_EVENT.COMPILED_UPDATE, model.shapeEvent);

    geometryModel.dispose!(target);
  },
}));
