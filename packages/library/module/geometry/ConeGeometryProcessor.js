import { defineProcessor, } from "@vis-three/middleware";
import { ConeBufferGeometry } from "three";
import { commands, create, dispose } from "./common";
import { getConeGeometryConfig } from "./GeometryConfig";
export default defineProcessor({
    type: "ConeGeometry",
    config: getConeGeometryConfig,
    commands: commands,
    create: (config) => create(new ConeBufferGeometry(config.radius, config.height, config.radialSegments, config.heightSegments, config.openEnded, config.thetaStart, config.thetaLength), config),
    dispose: dispose,
});
