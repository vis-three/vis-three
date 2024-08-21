import { Vector3 } from "three";
import { getLineTubeGeometryConfig } from "../GeometryConfig";
import { LineTubeGeometryConfig } from "../GeometryInterface";
import { defineGeometryModel } from "./common";
import { LineTubeGeometry } from "../extends";

export default defineGeometryModel<LineTubeGeometryConfig, LineTubeGeometry>(
  (geometryModel) => ({
    type: "LineTubeGeometry",
    config: getLineTubeGeometryConfig,
    create({ config }) {
      return geometryModel.create!(
        new LineTubeGeometry(
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
  })
);
