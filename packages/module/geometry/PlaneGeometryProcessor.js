import { defineProcessor } from "@vis-three/middleware";
import { PlaneBufferGeometry } from "three";
import { commands, create, dispose } from "./common";
import { getPlaneGeometryConfig } from "./GeometryConfig";
export default defineProcessor({
    type: "PlaneGeometry",
    config: getPlaneGeometryConfig,
    commands: commands,
    create: (config) => create(new PlaneBufferGeometry(config.width, config.height, config.widthSegments, config.heightSegments), config),
    dispose: dispose,
});
