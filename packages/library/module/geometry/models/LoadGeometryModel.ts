import { BoxGeometry, BufferGeometry } from "three";
import { getLoadGeometryConfig } from "../GeometryConfig";
import { LoadGeometryConfig } from "../GeometryInterface";
import { defineGeometryModel } from "./common";
import { LoadGeometry } from "../extends";

export default defineGeometryModel<LoadGeometryConfig, LoadGeometry>(
  (geometryModel) => ({
    type: "LoadGeometry",
    config: getLoadGeometryConfig,
    create({ config, engine }) {
      const originGeometry = engine.resourceManager.resourceMap.get(
        config.url
      )!;

      if (!originGeometry && !(originGeometry instanceof BufferGeometry)) {
        console.error(`engine rescoure can not found url: ${config.url}`);
        return new BoxGeometry(5, 5, 5);
      }

      return geometryModel.create!(
        new LoadGeometry(<BufferGeometry>originGeometry),
        config
      );
    },
    dispose({ target }) {
      geometryModel.dispose!(target);
    },
  })
);
