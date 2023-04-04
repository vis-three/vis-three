import {
  defineProcessor,
  EngineSupport,
  ProcessorCommands,
} from "@vis-three/middleware";
import { CylinderBufferGeometry, CylinderGeometry } from "three";
import { commands, create, dispose } from "../common";
import { GeometryCompiler } from "../GeometryCompiler";
import { getCylinderGeometryConfig } from "../GeometryConfig";
import { CylinderGeometryConfig } from "../GeometryInterface";

export default defineProcessor<
  CylinderGeometryConfig,
  CylinderGeometry,
  EngineSupport,
  GeometryCompiler
>({
  type: "CylinderGeometry",
  config: getCylinderGeometryConfig,
  commands: commands as unknown as ProcessorCommands<
    CylinderGeometryConfig,
    CylinderGeometry,
    EngineSupport,
    GeometryCompiler
  >,
  create: (config) =>
    create(
      new CylinderBufferGeometry(
        config.radiusTop,
        config.radiusBottom,
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
