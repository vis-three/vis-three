import { Vector3 } from "three";
import { getSplineCurveGeometryConfig } from "../GeometryConfig";
import { SplineCurveGeometryConfig } from "../GeometryInterface";
import { defineGeometryModel } from "./common";
import { SplineCurveGeometry } from "../extends";

export default defineGeometryModel<
  SplineCurveGeometryConfig,
  SplineCurveGeometry
>((geometryModel) => ({
  type: "SplineCurveGeometry",
  config: getSplineCurveGeometryConfig,
  create({ config }) {
    return geometryModel.create!(
      new SplineCurveGeometry(
        config.path.map(
          (vector3) => new Vector3(vector3.x, vector3.y, vector3.z)
        ),
        config.divisions,
        config.space
      ),
      config
    );
  },
  dispose({ target }) {
    geometryModel.dispose!(target);
  },
}));
