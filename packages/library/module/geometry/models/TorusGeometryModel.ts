import { TorusGeometry } from "three";
import { getTorusGeometryConfig } from "../GeometryConfig";
import { TorusGeometryConfig } from "../GeometryInterface";
import { defineGeometryModel } from "./common";

export default defineGeometryModel<TorusGeometryConfig, TorusGeometry>(
  (geometryModel) => ({
    type: "TorusGeometry",
    config: getTorusGeometryConfig,
    create({ config }) {
      return geometryModel.create!(
        new TorusGeometry(
          config.radius,
          config.tube,
          config.radialSegments,
          config.tubularSegments,
          config.arc
        ),
        config
      );
    },
    dispose({ target }) {
      geometryModel.dispose!(target);
    },
  })
);
