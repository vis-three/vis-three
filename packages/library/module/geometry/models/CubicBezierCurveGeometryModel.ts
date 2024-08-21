import { BoxGeometry, Vector3 } from "three";
import {
  getBoxGeometryConfig,
  getCubicBezierCurveGeometryConfig,
} from "../GeometryConfig";
import {
  BoxGeometryConfig,
  CubicBezierCurveGeometryConfig,
} from "../GeometryInterface";
import { defineGeometryModel } from "./common";
import { CubicBezierCurveGeometry } from "../extends";

export default defineGeometryModel<
  CubicBezierCurveGeometryConfig,
  CubicBezierCurveGeometry
>((geometryModel) => ({
  type: "CubicBezierCurveGeometry",
  config: getCubicBezierCurveGeometryConfig,
  create({ config }) {
    return geometryModel.create!(
      new CubicBezierCurveGeometry(
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
