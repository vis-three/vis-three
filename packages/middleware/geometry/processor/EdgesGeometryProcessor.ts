import { BoxBufferGeometry, BufferGeometry, EdgesGeometry } from "three";
import {
  antiShake,
  defineProcessor,
  EngineSupport,
  ProcessorCommands,
} from "@vis-three/core";
import { CONFIGTYPE } from "../../constants/configType";
import { EdgesGeometryConfig } from "../GeometryInterface";
import { commands, create } from "./common";

export default defineProcessor<EdgesGeometryConfig, EdgesGeometry>({
  configType: CONFIGTYPE.EDGESGEOMETRY,
  commands: <ProcessorCommands<EdgesGeometryConfig, EdgesGeometry>>(
    (<unknown>commands)
  ),
  create(config: EdgesGeometryConfig, engine: EngineSupport): EdgesGeometry {
    const geometry = engine.compilerManager.getObjectBySymbol(config.url);
    if (!geometry || !(geometry instanceof BufferGeometry)) {
      console.error(`engine rescoure can not found url: ${config.url}`);
      return new EdgesGeometry(new BoxBufferGeometry(5, 5, 5));
    }

    return create(new EdgesGeometry(<BufferGeometry>geometry), config);
  },
  dispose(target) {
    target.dispose();
  },
});
