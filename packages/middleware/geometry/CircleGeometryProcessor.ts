import { CircleBufferGeometry, CircleGeometry } from "three";
import { EngineSupport } from "../engine";
import { defineProcessor, ProcessorCommands } from "../module";
import { commands, create, dispose } from "./common";
import { GeometryCompiler } from "./GeometryCompiler";
import { getCircleGeometryConfig } from "./GeometryConfig";
import { CircleGeometryConfig } from "./GeometryInterface";

export default defineProcessor<
  CircleGeometryConfig,
  CircleGeometry,
  EngineSupport,
  GeometryCompiler
>({
  type: "CircleGeometry",
  config: getCircleGeometryConfig,
  commands: commands as unknown as ProcessorCommands<
    CircleGeometryConfig,
    CircleGeometry,
    EngineSupport,
    GeometryCompiler
  >,
  create: (config) =>
    create(
      new CircleBufferGeometry(
        config.radius,
        config.segments,
        config.thetaStart,
        config.thetaLength
      ),
      config
    ),
  dispose: dispose,
});
