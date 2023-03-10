import { QuadraticBezierCurveGeometry } from "@vis-three/core";
import { Vector3 } from "three";
import { EngineSupport } from "../engine";
import { defineProcessor, ProcessorCommands } from "../module";
import { commands, create, dispose } from "./common";
import { GeometryCompiler } from "./GeometryCompiler";
import { getQuadraticBezierCurveGeometryConfig } from "./GeometryConfig";
import { QuadraticBezierCurveGeometryConfig } from "./GeometryInterface";

export default defineProcessor<
  QuadraticBezierCurveGeometryConfig,
  QuadraticBezierCurveGeometry,
  EngineSupport,
  GeometryCompiler
>({
  type: "QuadraticBezierCurveGeometry",
  config: getQuadraticBezierCurveGeometryConfig,
  commands: commands as unknown as ProcessorCommands<
    QuadraticBezierCurveGeometryConfig,
    QuadraticBezierCurveGeometry,
    EngineSupport,
    GeometryCompiler
  >,
  create: (config) =>
    create(
      new QuadraticBezierCurveGeometry(
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
