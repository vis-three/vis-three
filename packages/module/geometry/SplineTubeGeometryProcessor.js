import { SplineTubeGeometry } from "@vis-three/core";
import { defineProcessor, } from "@vis-three/middleware";
import { Vector3 } from "three";
import { commands, create, dispose } from "./common";
import { getSplineTubeGeometryConfig } from "./GeometryConfig";
export default defineProcessor({
    type: "SplineTubeGeometry",
    config: getSplineTubeGeometryConfig,
    commands: commands,
    create: (config) => create(new SplineTubeGeometry(config.path.map((vector3) => new Vector3(vector3.x, vector3.y, vector3.z)), config.tubularSegments, config.radius, config.radialSegments, config.closed), config),
    dispose: dispose,
});
