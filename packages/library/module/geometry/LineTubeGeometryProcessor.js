import { LineTubeGeometry } from "@vis-three/core";
import { defineProcessor, } from "@vis-three/middleware";
import { Vector3 } from "three";
import { commands, create, dispose } from "./common";
import { getLineTubeGeometryConfig } from "./GeometryConfig";
export default defineProcessor({
    type: "LineTubeGeometry",
    config: getLineTubeGeometryConfig,
    commands: commands,
    create: (config) => create(new LineTubeGeometry(config.path.map((vector3) => new Vector3(vector3.x, vector3.y, vector3.z)), config.tubularSegments, config.radius, config.radialSegments, config.closed), config),
    dispose: dispose,
});
