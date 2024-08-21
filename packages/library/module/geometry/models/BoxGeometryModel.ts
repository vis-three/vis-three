import { BoxGeometry } from "three";
import { getBoxGeometryConfig } from "../GeometryConfig";
import { BoxGeometryConfig } from "../GeometryInterface";
import { defineGeometryModel } from "./common";

export default defineGeometryModel<BoxGeometryConfig, BoxGeometry>(
  (geometryModel) => ({
    type: "BoxGeometry",
    config: getBoxGeometryConfig,
    create({ config }) {
      return geometryModel.create!(
        new BoxGeometry(
          config.width,
          config.height,
          config.depth,
          config.widthSegments,
          config.heightSegments,
          config.depthSegments
        ),
        config
      );
    },
    dispose({ target }) {
      geometryModel.dispose!(target);
    },
  })
);
