import {
  defineProcessor,
  EngineSupport,
  ProcessorCommands,
} from "@vis-three/middleware";
import { Vector3 } from "three";
import { commands, create, dispose } from "../common";
import { GeometryCompiler } from "../GeometryCompiler";
import { getCubicBezierCurveGeometryConfig } from "../GeometryConfig";
import { CubicBezierCurveGeometryConfig } from "../GeometryInterface";
import { CubicBezierCurveGeometry } from "../extends";

export default defineProcessor<
  CubicBezierCurveGeometryConfig,
  CubicBezierCurveGeometry,
  EngineSupport,
  GeometryCompiler
>({
  type: "CubicBezierCurveGeometry",
  config: getCubicBezierCurveGeometryConfig,
  commands: commands as unknown as ProcessorCommands<
    CubicBezierCurveGeometryConfig,
    CubicBezierCurveGeometry,
    EngineSupport,
    GeometryCompiler
  >,
  create: (config) =>
    create(
      new CubicBezierCurveGeometry(
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
