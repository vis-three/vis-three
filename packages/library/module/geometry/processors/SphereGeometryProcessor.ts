import {
  defineProcessor,
  EngineSupport,
  ProcessorCommands,
} from "@vis-three/middleware";
import { SphereBufferGeometry, SphereGeometry } from "three";
import { commands, create, dispose } from "./common";
import { GeometryCompiler } from "../GeometryCompiler";
import { getSphereGeometryConfig } from "../GeometryConfig";
import { SphereGeometryConfig } from "../GeometryInterface";

export default defineProcessor<
  SphereGeometryConfig,
  SphereGeometry,
  EngineSupport,
  GeometryCompiler
>({
  type: "SphereGeometry",
  config: getSphereGeometryConfig,
  commands: commands as unknown as ProcessorCommands<
    SphereGeometryConfig,
    SphereGeometry,
    EngineSupport,
    GeometryCompiler
  >,
  create: (config) =>
    create(
      new SphereBufferGeometry(
        config.radius,
        config.widthSegments,
        config.heightSegments,
        config.phiStart,
        config.phiLength,
        config.thetaStart,
        config.thetaLength
      ),
      config
    ),
  dispose: dispose,
});
