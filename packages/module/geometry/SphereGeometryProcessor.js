import { defineProcessor, } from "@vis-three/middleware";
import { SphereBufferGeometry } from "three";
import { commands, create, dispose } from "./common";
import { getSphereGeometryConfig } from "./GeometryConfig";
export default defineProcessor({
    type: "SphereGeometry",
    config: getSphereGeometryConfig,
    commands: commands,
    create: (config) => create(new SphereBufferGeometry(config.radius, config.widthSegments, config.heightSegments, config.phiStart, config.phiLength, config.thetaStart, config.thetaLength), config),
    dispose: dispose,
});
