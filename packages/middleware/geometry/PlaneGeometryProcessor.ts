import { PlaneBufferGeometry, PlaneGeometry } from "three";
import { EngineSupport } from "../engine";
import { defineProcessor, ProcessorCommands } from "../module";
import { commands, create, dispose } from "./common";
import { GeometryCompiler } from "./GeometryCompiler";
import { getPlaneGeometryConfig } from "./GeometryConfig";
import { PlaneGeometryConfig } from "./GeometryInterface";

export default defineProcessor<
  PlaneGeometryConfig,
  PlaneGeometry,
  EngineSupport,
  GeometryCompiler
>({
  type: "PlaneGeometry",
  config: getPlaneGeometryConfig,
  commands: commands as unknown as ProcessorCommands<
    PlaneGeometryConfig,
    PlaneGeometry,
    EngineSupport,
    GeometryCompiler
  >,
  create: (config) =>
    create(
      new PlaneBufferGeometry(
        config.width,
        config.height,
        config.widthSegments,
        config.heightSegments
      ),
      config
    ),
  dispose: dispose,
});
