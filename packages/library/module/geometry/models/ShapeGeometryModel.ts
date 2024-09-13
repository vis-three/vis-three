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
    cacheShapeEvent?: () => void;
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
      if (model.shapeEvent) {
        model.cacheShapeEvent = model.shapeEvent;
      }

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
    if (model.shapeEvent) {
      model
        .toModel(config.shape)
        ?.off(MODEL_EVENT.COMPILED_UPDATE, model.shapeEvent);

      if (model.cacheShapeEvent) {
        model.shapeEvent = model.cacheShapeEvent;
        model.cacheShapeEvent = undefined;
      }
    }

    geometryModel.dispose!(target);
  },
}));
