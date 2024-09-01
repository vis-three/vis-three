import { Engine, Plugin } from "@vis-three/core";
import { Mesh } from "three";
import { CastOptions, MeshBVHManager } from "./MeshBVHManager";
export interface MeshBVHEngine extends Engine {
    /**bvh管理器 */
    meshBVHManager: MeshBVHManager;
    /**添加bvh */
    addBVH: (mesh: Mesh) => MeshBVHEngine;
}
export interface MeshBVHPluginParameters {
    /**可视化显示bvh */
    visualizer?: boolean;
    /**自定义形状检测规则 */
    shapecast?: CastOptions;
}
export declare const MESH_BVH_PLUGIN: string;
export declare const MeshBVHPlugin: Plugin<MeshBVHEngine>;
