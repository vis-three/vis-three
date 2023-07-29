import { BoxBufferGeometry, BufferGeometry, EdgesGeometry } from "three";
import { EdgesGeometryConfig } from "../GeometryInterface";
import { commands, create } from "./common";
import { GeometryCompiler } from "../GeometryCompiler";
import { getEdgesGeometryConfig } from "../GeometryConfig";
import {
  defineProcessor,
  EngineSupport,
  MODULETYPE,
  ProcessorCommands,
} from "@vis-three/middleware";

const occupyGeometry = new EdgesGeometry(new BoxBufferGeometry(5, 5, 5));

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
    const geometry = engine.compilerManager.getObjectfromModule(
      MODULETYPE.GEOMETRY,
      config.target
    );
    if (!geometry || !(geometry instanceof BufferGeometry)) {
      console.error(`engine rescoure can not found url: ${config.target}`);
      return occupyGeometry;
    }

    return create(
      new EdgesGeometry(<BufferGeometry>geometry, config.thresholdAngle),
      config
    );
  },
  dispose(target) {
    target.dispose();
  },
});
