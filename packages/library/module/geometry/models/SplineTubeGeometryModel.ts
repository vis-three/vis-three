import { Vector3 } from "three";
import { getSplineTubeGeometryConfig } from "../GeometryConfig";
import { SplineTubeGeometryConfig } from "../GeometryInterface";
import { defineGeometryModel } from "./common";
import { SplineTubeGeometry } from "../extends";

export default defineGeometryModel<
  SplineTubeGeometryConfig,
  SplineTubeGeometry
>((geometryModel) => ({
  type: "SplineTubeGeometry",
  config: getSplineTubeGeometryConfig,
  create({ config }) {
    return geometryModel.create!(
      new SplineTubeGeometry(
        config.path.map(
          (vector3) => new Vector3(vector3.x, vector3.y, vector3.z)
        ),
        config.tubularSegments,
        config.radius,
        config.radialSegments,
        config.closed
      ),
      config
    );
  },
  dispose({ target }) {
    geometryModel.dispose!(target);
  },
}));
