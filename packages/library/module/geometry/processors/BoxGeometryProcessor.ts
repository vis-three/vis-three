import {
  defineProcessor,
  EngineSupport,
  ProcessorCommands,
} from "@vis-three/middleware";
import { BoxBufferGeometry, BoxGeometry } from "three";
import { commands, create, dispose } from "./common";
import { GeometryCompiler } from "../GeometryCompiler";
import { getBoxGeometryConfig } from "../GeometryConfig";
import { BoxGeometryConfig } from "../GeometryInterface";

export default defineProcessor<
  BoxGeometryConfig,
  BoxGeometry,
  EngineSupport,
  GeometryCompiler
>({
  type: "BoxGeometry",
  config: getBoxGeometryConfig,
  commands: commands as unknown as ProcessorCommands<
    BoxGeometryConfig,
    BoxGeometry,
    EngineSupport,
    GeometryCompiler
  >,
  create: (config) =>
    create(
      new BoxBufferGeometry(
        config.width,
        config.height,
        config.depth,
        config.widthSegments,
        config.heightSegments,
        config.depthSegments
      ),
      config
    ),
  dispose: dispose,
});
