import { LineTubeGeometry } from "@vis-three/core";
import { Vector3 } from "three";
import { EngineSupport } from "../engine";
import { defineProcessor, ProcessorCommands } from "../module";
import { commands, create, dispose } from "./common";
import { GeometryCompiler } from "./GeometryCompiler";
import { getLineTubeGeometryConfig } from "./GeometryConfig";
import { LineTubeGeometryConfig } from "./GeometryInterface";

export default defineProcessor<
  LineTubeGeometryConfig,
  LineTubeGeometry,
  EngineSupport,
  GeometryCompiler
>({
  type: "LineTubeGeometry",
  config: getLineTubeGeometryConfig,
  commands: commands as unknown as ProcessorCommands<
    LineTubeGeometryConfig,
    LineTubeGeometry,
    EngineSupport,
    GeometryCompiler
  >,
  create: (config) =>
    create(
      new LineTubeGeometry(
        config.path.map(
          (vector3) => new Vector3(vector3.x, vector3.y, vector3.z)
        ),
        config.tubularSegments,
        config.radius,
        config.radialSegments,
        config.closed
      ),
      config
    ),
  dispose: dispose,
});
