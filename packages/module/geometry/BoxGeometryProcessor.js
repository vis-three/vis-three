import { defineProcessor, } from "@vis-three/middleware";
import { BoxBufferGeometry } from "three";
import { commands, create, dispose } from "./common";
import { getBoxGeometryConfig } from "./GeometryConfig";
export default defineProcessor({
    type: "BoxGeometry",
    config: getBoxGeometryConfig,
    commands: commands,
    create: (config) => create(new BoxBufferGeometry(config.width, config.height, config.depth, config.widthSegments, config.heightSegments, config.depthSegments), config),
    dispose: dispose,
});
