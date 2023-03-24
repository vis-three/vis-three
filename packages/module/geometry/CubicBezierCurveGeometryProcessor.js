import { CubicBezierCurveGeometry } from "@vis-three/core";
import { defineProcessor, } from "@vis-three/middleware";
import { Vector3 } from "three";
import { commands, create, dispose } from "./common";
import { getCubicBezierCurveGeometryConfig } from "./GeometryConfig";
export default defineProcessor({
    type: "CubicBezierCurveGeometry",
    config: getCubicBezierCurveGeometryConfig,
    commands: commands,
    create: (config) => create(new CubicBezierCurveGeometry(config.path.map((vector3) => new Vector3(vector3.x, vector3.y, vector3.z)), config.divisions, config.space), config),
    dispose: dispose,
});
