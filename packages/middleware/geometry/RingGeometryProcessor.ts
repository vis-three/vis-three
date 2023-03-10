import { RingBufferGeometry, RingGeometry } from "three";
import { EngineSupport } from "../engine";
import { defineProcessor, ProcessorCommands } from "../module";
import { commands, create, dispose } from "./common";
import { GeometryCompiler } from "./GeometryCompiler";
import { getRingGeometryConfig } from "./GeometryConfig";
import { RingGeometryConfig } from "./GeometryInterface";

export default defineProcessor<
  RingGeometryConfig,
  RingGeometry,
  EngineSupport,
  GeometryCompiler
>({
  type: "RingGeometry",
  config: getRingGeometryConfig,
  commands: commands as unknown as ProcessorCommands<
    RingGeometryConfig,
    RingGeometry,
    EngineSupport,
    GeometryCompiler
  >,
  create: (config) =>
    create(
      new RingBufferGeometry(
        config.innerRadius,
        config.outerRadius,
        config.thetaSegments,
        config.phiSegments,
        config.thetaStart,
        config.thetaLength
      ),
      config
    ),
  dispose: dispose,
});
