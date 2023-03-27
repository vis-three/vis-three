import { defineProcessor, } from "@vis-three/middleware";
import { RingBufferGeometry } from "three";
import { commands, create, dispose } from "./common";
import { getRingGeometryConfig } from "./GeometryConfig";
export default defineProcessor({
    type: "RingGeometry",
    config: getRingGeometryConfig,
    commands: commands,
    create: (config) => create(new RingBufferGeometry(config.innerRadius, config.outerRadius, config.thetaSegments, config.phiSegments, config.thetaStart, config.thetaLength), config),
    dispose: dispose,
});
