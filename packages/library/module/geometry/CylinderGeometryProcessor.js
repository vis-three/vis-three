import { defineProcessor, } from "@vis-three/middleware";
import { CylinderBufferGeometry } from "three";
import { commands, create, dispose } from "./common";
import { getCylinderGeometryConfig } from "./GeometryConfig";
export default defineProcessor({
    type: "CylinderGeometry",
    config: getCylinderGeometryConfig,
    commands: commands,
    create: (config) => create(new CylinderBufferGeometry(config.radiusTop, config.radiusBottom, config.height, config.radialSegments, config.heightSegments, config.openEnded, config.thetaStart, config.thetaLength), config),
    dispose: dispose,
});
