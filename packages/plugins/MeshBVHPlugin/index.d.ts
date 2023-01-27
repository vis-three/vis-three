import { Engine, Plugin } from "@vis-three/core";
import { Mesh } from "three";
import { CastOptions, MeshBVHManager } from "./MeshBVHManager";
export interface MeshBVHEngine extends Engine {
    meshBVHManager: MeshBVHManager;
    addBVH: (mesh: Mesh) => MeshBVHEngine;
}
export interface MeshBVHPluginParameters {
    visualizer?: boolean;
    shapecast?: CastOptions;
}
export declare const MESH_BVH_PLUGIN: string;
export declare const MeshBVHPlugin: Plugin<MeshBVHEngine>;
