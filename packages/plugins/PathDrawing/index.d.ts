import { Plugin } from "@vis-three/core";
import { PointerManagerEngine } from "@vis-three/plugin-pointer-manager";
import { PathDrawing } from "./PathDrawing";
import { Vector3 } from "three";
export interface PathDrawingEngine extends PointerManagerEngine {
    pathDrawing: PathDrawing;
    drawPath: () => PathDrawingEngine;
    getPathPoint: (result?: Vector3) => Vector3 | null;
}
export declare const PATH_DRAWING_PLUGIN: string;
export declare const PathDrawingPlugin: Plugin<PathDrawingEngine>;
