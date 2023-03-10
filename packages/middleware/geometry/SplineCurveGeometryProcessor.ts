import { SplineCurveGeometry } from "@vis-three/core";
import { Vector3 } from "three";
import { EngineSupport } from "../engine";
import { defineProcessor, ProcessorCommands } from "../module";
import { commands, create, dispose } from "./common";
import { GeometryCompiler } from "./GeometryCompiler";
import { getSplineCurveGeometryConfig } from "./GeometryConfig";
import { SplineCurveGeometryConfig } from "./GeometryInterface";

export default defineProcessor<
  SplineCurveGeometryConfig,
  SplineCurveGeometry,
  EngineSupport,
  GeometryCompiler
>({
  type: "SplineCurveGeometry",
  config: getSplineCurveGeometryConfig,
  commands: commands as unknown as ProcessorCommands<
    SplineCurveGeometryConfig,
    SplineCurveGeometry,
    EngineSupport,
    GeometryCompiler
  >,
  create: (config) =>
    create(
      new SplineCurveGeometry(
        config.path.map(
          (vector3) => new Vector3(vector3.x, vector3.y, vector3.z)
        ),
        config.divisions,
        config.space
      ),
      config
    ),
  dispose: dispose,
});
