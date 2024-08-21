import { Vector3 } from "three";
import { getQuadraticBezierCurveGeometryConfig } from "../GeometryConfig";
import { QuadraticBezierCurveGeometryConfig } from "../GeometryInterface";
import { defineGeometryModel } from "./common";
import { QuadraticBezierCurveGeometry } from "../extends";

export default defineGeometryModel<
  QuadraticBezierCurveGeometryConfig,
  QuadraticBezierCurveGeometry
>((geometryModel) => ({
  type: "QuadraticBezierCurveGeometry",
  config: getQuadraticBezierCurveGeometryConfig,
  create({ config }) {
    return geometryModel.create!(
      new QuadraticBezierCurveGeometry(
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
