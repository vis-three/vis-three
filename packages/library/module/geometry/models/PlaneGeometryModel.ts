import { PlaneGeometry } from "three";
import { getPlaneGeometryConfig } from "../GeometryConfig";
import { PlaneGeometryConfig } from "../GeometryInterface";
import { defineGeometryModel } from "./common";

export default defineGeometryModel<PlaneGeometryConfig, PlaneGeometry>(
  (geometryModel) => ({
    type: "PlaneGeometry",
    config: getPlaneGeometryConfig,
    create({ config }) {
      return geometryModel.create!(
        new PlaneGeometry(
          config.width,
          config.height,
          config.widthSegments,
          config.heightSegments
        ),
        config
      );
    },
    dispose({ target }) {
      geometryModel.dispose!(target);
    },
  })
);
