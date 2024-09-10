import { ConeGeometry } from "three";
import { getConeGeometryConfig } from "../GeometryConfig";
import { ConeGeometryConfig } from "../GeometryInterface";
import { defineGeometryModel } from "./common";

export default defineGeometryModel<ConeGeometryConfig, ConeGeometry>(
  (geometryModel) => ({
    type: "ConeGeometry",
    config: getConeGeometryConfig,
    create({ config }) {
      return geometryModel.create!(
        new ConeGeometry(
          config.radius,
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
