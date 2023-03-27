import { LineShapeGeometry } from "@vis-three/core";
import { defineProcessor, } from "@vis-three/middleware";
import { Vector2 } from "three";
import { commands, create, dispose } from "./common";
import { getLineShapeGeometryConfig } from "./GeometryConfig";
export default defineProcessor({
    type: "LineShapeGeometry",
    config: getLineShapeGeometryConfig,
    commands: commands,
    create: (config) => create(new LineShapeGeometry(config.path.map((vector2) => new Vector2(vector2.x, vector2.y)), config.curveSegments), config),
    dispose: dispose,
});
