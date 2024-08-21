import { Vector2 } from "three";
import { getLineShapeGeometryConfig } from "../GeometryConfig";
import { LineShapeGeometryConfig } from "../GeometryInterface";
import { defineGeometryModel } from "./common";
import { LineShapeGeometry } from "../extends";

export default defineGeometryModel<LineShapeGeometryConfig, LineShapeGeometry>(
  (geometryModel) => ({
    type: "LineShapeGeometry",
    config: getLineShapeGeometryConfig,
    create({ config }) {
      return geometryModel.create!(
        new LineShapeGeometry(
          config.path.map((vector2) => new Vector2(vector2.x, vector2.y)),
          config.curveSegments
        ),
        config
      );
    },
    dispose({ target }) {
      geometryModel.dispose!(target);
    },
  })
);
