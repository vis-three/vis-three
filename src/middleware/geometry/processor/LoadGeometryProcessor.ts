import { BoxBufferGeometry, BufferGeometry } from "three";
import { defineProcessor } from "../../../core/Processor";
import { EngineSupport } from "../../../engine/EngineSupport";
import { LoadGeometry } from "../../../extends/geometry/LoadGeometry";
import { CONFIGTYPE } from "../../constants/configType";
import { LoadGeometryConfig } from "../GeometryInterface";
import { commands, transfromAnchor, create } from "./common";

export default defineProcessor<LoadGeometryConfig, LoadGeometry>({
  configType: CONFIGTYPE.LOADGEOMETRY,
  commands,
  create(config: LoadGeometryConfig, engine: EngineSupport) {
    const originGeometry = engine.resourceManager.resourceMap.get(config.url)!;

    if (!originGeometry && !(originGeometry instanceof BufferGeometry)) {
      console.error(`engine rescoure can not found url: ${config.url}`);
      return new BoxBufferGeometry(5, 5, 5);
    }

    return create(new LoadGeometry(<BufferGeometry>originGeometry), config);
  },
  dispose(target: LoadGeometry) {
    target.dispose();
  },
});
