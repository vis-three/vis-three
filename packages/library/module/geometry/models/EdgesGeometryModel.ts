import { BoxGeometry, BufferGeometry, EdgesGeometry } from "three";
import { getEdgesGeometryConfig } from "../GeometryConfig";
import { EdgesGeometryConfig } from "../GeometryInterface";
import { defineGeometryModel } from "./common";
import { MODULE_TYPE } from "@vis-three/tdcm";

export default defineGeometryModel<
  EdgesGeometryConfig,
  EdgesGeometry,
  {},
  {
    occupyGeometry: EdgesGeometry;
  }
>((geometryModel) => ({
  type: "EdgesGeometry",
  config: getEdgesGeometryConfig,
  shared: {
    occupyGeometry: new EdgesGeometry(new BoxGeometry(5, 5, 5)),
  },
  create({ model, config, engine }) {
    const geometry = engine.compilerManager.getObjectFromModule(
      MODULE_TYPE.GEOMETRY,
      config.target
    );
    if (!geometry || !(geometry instanceof BufferGeometry)) {
      console.error(`engine rescoure can not found url: ${config.target}`);
      return model.occupyGeometry;
    }

    return geometryModel.create!(
      new EdgesGeometry(<BufferGeometry>geometry, config.thresholdAngle),
      config
    );
  },
  dispose({ target }) {
    geometryModel.dispose!(target);
  },
}));
