import { Engine, Plugin } from "@vis-three/core";
import { CastOptions, MeshBVHManager } from "./MeshBVHManager";
export interface MeshBVHEngine extends Engine {
    MeshBVHManager: MeshBVHManager;
}
export interface MeshBVHPluginParameters {
    visualizer?: boolean;
    shapecast?: CastOptions;
}
export declare const MESH_BVH_PLUGIN: string;
export declare const MeshBVHPlugin: Plugin<MeshBVHEngine>;
