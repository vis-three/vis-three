import {
  defineProcessor,
  EngineSupport,
  MODULETYPE,
  ProcessorCommands,
} from "@vis-three/middleware";
import {
  Curve,
  ExtrudeBufferGeometry,
  ExtrudeGeometry,
  Path,
  Shape,
  Vector2,
  Vector3,
} from "three";
import { commands, create, dispose } from "./common";
import { GeometryCompiler } from "../GeometryCompiler";
import { getExtrudeGeometryConfig } from "../GeometryConfig";
import { ExtrudeGeometryConfig } from "../GeometryInterface";

export default defineProcessor<
  ExtrudeGeometryConfig,
  ExtrudeGeometry,
  EngineSupport,
  GeometryCompiler
>({
  type: "ExtrudeGeometry",
  config: getExtrudeGeometryConfig,
  commands: commands as unknown as ProcessorCommands<
    ExtrudeGeometryConfig,
    ExtrudeGeometry,
    EngineSupport,
    GeometryCompiler
  >,
  create: (config, engine) =>
    create(
      new ExtrudeBufferGeometry(
        (engine.compilerManager.getObjectfromModule(
          MODULETYPE.SHAPE,
          config.shapes
        ) as Shape) || undefined,
        Object.assign({}, config.options, {
          extrudePath:
            (engine.compilerManager.getObjectfromModule(
              MODULETYPE.PATH,
              config.options.extrudePath
            ) as Curve<Vector3>) || undefined,
        })
      ),
      config
    ),
  dispose: dispose,
});
