import { CylinderGeometry } from "three";
import { getCylinderGeometryConfig } from "../GeometryConfig";
import { CylinderGeometryConfig } from "../GeometryInterface";
import { defineGeometryModel } from "./common";

export default defineGeometryModel<CylinderGeometryConfig, CylinderGeometry>(
  (geometryModel) => ({
    type: "CylinderGeometry",
    config: getCylinderGeometryConfig,
    create({ config }) {
      return geometryModel.create!(
        new CylinderGeometry(
          config.radiusTop,
          config.radiusBottom,
          config.height,
          config.radialSegments,
          config.heightSegments,
          config.openEnded,
          config.thetaStart,
          config.thetaLength
        ),
        config
      );
    },
    dispose({ target }) {
      geometryModel.dispose!(target);
    },
  })
);
