import {
  defineProcessor,
  EngineSupport,
  ProcessorCommands,
} from "@vis-three/middleware";
import { Vector3 } from "three";
import { commands, create, dispose } from "../common";
import { GeometryCompiler } from "../GeometryCompiler";
import { getLineCurveGeometryConfig } from "../GeometryConfig";
import { LineCurveGeometryConfig } from "../GeometryInterface";
import { LineCurveGeometry } from "../extends";

export default defineProcessor<
  LineCurveGeometryConfig,
  LineCurveGeometry,
  EngineSupport,
  GeometryCompiler
>({
  type: "LineCurveGeometry",
  config: getLineCurveGeometryConfig,
  commands: commands as unknown as ProcessorCommands<
    LineCurveGeometryConfig,
    LineCurveGeometry,
    EngineSupport,
    GeometryCompiler
  >,
  create: (config) =>
    create(
      new LineCurveGeometry(
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
