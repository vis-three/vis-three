import { BoxBufferGeometry, BufferGeometry, EdgesGeometry } from "three";
import { EdgesGeometryConfig } from "./GeometryInterface";
import { commands, create } from "./common";
import { GeometryCompiler } from "./GeometryCompiler";
import { getEdgesGeometryConfig } from "./GeometryConfig";
import {
  defineProcessor,
  EngineSupport,
  ProcessorCommands,
} from "@vis-three/middleware";

export default defineProcessor<
  EdgesGeometryConfig,
  EdgesGeometry,
  EngineSupport,
  GeometryCompiler
>({
  type: "EdgesGeometry",
  config: getEdgesGeometryConfig,
  commands: <
    ProcessorCommands<
      EdgesGeometryConfig,
      EdgesGeometry,
      EngineSupport,
      GeometryCompiler
    >
  >(<unknown>commands),
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
