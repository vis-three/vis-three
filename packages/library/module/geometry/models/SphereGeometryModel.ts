import { SphereGeometry } from "three";
import { getSphereGeometryConfig } from "../GeometryConfig";
import { SphereGeometryConfig } from "../GeometryInterface";
import { defineGeometryModel } from "./common";

export default defineGeometryModel<SphereGeometryConfig, SphereGeometry>(
  (geometryModel) => ({
    type: "SphereGeometry",
    config: getSphereGeometryConfig,
    create({ config }) {
      return geometryModel.create!(
        new SphereGeometry(
          config.radius,
          config.widthSegments,
          config.heightSegments,
          config.phiStart,
          config.phiLength,
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
