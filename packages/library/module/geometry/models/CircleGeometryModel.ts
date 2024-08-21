import { CircleGeometry } from "three";
import { getCircleGeometryConfig } from "../GeometryConfig";
import { CircleGeometryConfig } from "../GeometryInterface";
import { defineGeometryModel } from "./common";

export default defineGeometryModel<CircleGeometryConfig, CircleGeometry>(
  (geometryModel) => ({
    type: "CircleGeometry",
    config: getCircleGeometryConfig,
    create({ config }) {
      return geometryModel.create!(
        new CircleGeometry(
          config.radius,
          config.segments,
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
