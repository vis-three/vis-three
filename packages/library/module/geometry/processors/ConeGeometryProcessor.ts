import {
  defineProcessor,
  EngineSupport,
  ProcessorCommands,
} from "@vis-three/middleware";
import { ConeBufferGeometry, ConeGeometry } from "three";
import { commands, create, dispose } from "./common";
import { GeometryCompiler } from "../GeometryCompiler";
import { getConeGeometryConfig } from "../GeometryConfig";
import { ConeGeometryConfig } from "../GeometryInterface";

export default defineProcessor<
  ConeGeometryConfig,
  ConeGeometry,
  EngineSupport,
  GeometryCompiler
>({
  type: "ConeGeometry",
  config: getConeGeometryConfig,
  commands: commands as unknown as ProcessorCommands<
    ConeGeometryConfig,
    ConeGeometry,
    EngineSupport,
    GeometryCompiler
  >,
  create: (config) =>
    create(
      new ConeBufferGeometry(
        config.radius,
        config.height,
        config.radialSegments,
        config.heightSegments,
        config.openEnded,
        config.thetaStart,
        config.thetaLength
      ),
      config
    ),
  dispose: dispose,
});
