import { BoxBufferGeometry, BufferGeometry } from "three";
import { LoadGeometryConfig } from "../GeometryInterface";
import { commands, create } from "../common";
import { GeometryCompiler } from "../GeometryCompiler";
import { getLoadGeometryConfig } from "../GeometryConfig";
import {
  defineProcessor,
  EngineSupport,
  ProcessorCommands,
} from "@vis-three/middleware";
import { LoadGeometry } from "../extends";

export default defineProcessor<
  LoadGeometryConfig,
  LoadGeometry,
  EngineSupport,
  GeometryCompiler
>({
  type: "LoadGeometry",
  config: getLoadGeometryConfig,
  commands: <
    ProcessorCommands<
      LoadGeometryConfig,
      LoadGeometry,
      EngineSupport,
      GeometryCompiler
    >
  >(<unknown>commands),
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
