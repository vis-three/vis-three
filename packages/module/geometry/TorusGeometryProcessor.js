import { defineProcessor, } from "@vis-three/middleware";
import { TorusGeometry } from "three";
import { commands, create, dispose } from "./common";
import { getTorusGeometryConfig } from "./GeometryConfig";
export default defineProcessor({
    type: "TorusGeometry",
    config: getTorusGeometryConfig,
    commands: commands,
    create: (config) => create(new TorusGeometry(config.radius, config.tube, config.radialSegments, config.tubularSegments, config.arc), config),
    dispose: dispose,
});
