import { Plugin } from "@vis-three/core";
import { PointerManagerEngine } from "@vis-three/plugin-pointer-manager";
import { Vector3 } from "three";
import { Face, PathSketcher } from "./PathSketcher";
export interface PathDrawingEngine extends PointerManagerEngine {
    pathSketcher: PathSketcher;
    drawPathByPlane: (normal: Vector3, constant: number, offset: Vector3) => PathDrawingEngine;
    drawPathByFace: (face: Face, offset: Vector3) => PathDrawingEngine;
}
export * from "./PathSketcher";
export declare const PATH_DRAWING_PLUGIN: string;
export declare const PathDrawingPlugin: Plugin<PathDrawingEngine, object>;
