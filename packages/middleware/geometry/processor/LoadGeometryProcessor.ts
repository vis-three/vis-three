import { BoxBufferGeometry, BufferGeometry } from "three";
import {
  antiShake,
  defineProcessor,
  EngineSupport,
  LoadGeometry,
  ProcessorCommands,
} from "@vis-three/core";
import { CONFIGTYPE } from "../../constants/configType";
import { LoadGeometryConfig } from "../GeometryInterface";
import { commands, create } from "./common";

export default defineProcessor<LoadGeometryConfig, LoadGeometry>({
  configType: CONFIGTYPE.LOADGEOMETRY,
  commands: <ProcessorCommands<LoadGeometryConfig, LoadGeometry>>(
    (<unknown>commands)
  ),
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
