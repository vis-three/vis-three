import { TorusGeometry } from "three";
import { EngineSupport } from "../engine";
import { defineProcessor, ProcessorCommands } from "../module";
import { commands, create, dispose } from "./common";
import { GeometryCompiler } from "./GeometryCompiler";
import { getTorusGeometryConfig } from "./GeometryConfig";
import { TorusGeometryConfig } from "./GeometryInterface";

export default defineProcessor<
  TorusGeometryConfig,
  TorusGeometry,
  EngineSupport,
  GeometryCompiler
>({
  type: "TorusGeometry",
  config: getTorusGeometryConfig,
  commands: commands as unknown as ProcessorCommands<
    TorusGeometryConfig,
    TorusGeometry,
    EngineSupport,
    GeometryCompiler
  >,
  create: (config) =>
    create(
      new TorusGeometry(
        config.radius,
        config.tube,
        config.radialSegments,
        config.tubularSegments,
        config.arc
      ),
      config
    ),
  dispose: dispose,
});
