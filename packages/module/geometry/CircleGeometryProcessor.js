import { defineProcessor, } from "@vis-three/middleware";
import { CircleBufferGeometry } from "three";
import { commands, create, dispose } from "./common";
import { getCircleGeometryConfig } from "./GeometryConfig";
export default defineProcessor({
    type: "CircleGeometry",
    config: getCircleGeometryConfig,
    commands: commands,
    create: (config) => create(new CircleBufferGeometry(config.radius, config.segments, config.thetaStart, config.thetaLength), config),
    dispose: dispose,
});
