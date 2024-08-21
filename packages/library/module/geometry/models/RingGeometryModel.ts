import { RingGeometry } from "three";
import { getRingGeometryConfig } from "../GeometryConfig";
import { RingGeometryConfig } from "../GeometryInterface";
import { defineGeometryModel } from "./common";

export default defineGeometryModel<RingGeometryConfig, RingGeometry>(
  (geometryModel) => ({
    type: "RingGeometry",
    config: getRingGeometryConfig,
    create({ config }) {
      return geometryModel.create!(
        new RingGeometry(
          config.innerRadius,
          config.outerRadius,
          config.thetaSegments,
          config.phiSegments,
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
