import { transPkgName } from "@vis-three/utils";
import { MeshBVHManager } from "./MeshBVHManager";
import { name as pkgname } from "./package.json";
export const MESH_BVH_PLUGIN = transPkgName(pkgname);
export const MeshBVHPlugin = function (params = {}) {
    return {
        name: MESH_BVH_PLUGIN,
        install(engine) {
            const manager = new MeshBVHManager();
            if (params.visualizer) {
                manager.createVisualizer();
                engine.scene.add(manager.visualizer);
            }
            if (params.shapecast) {
                manager.castOptions = params.shapecast;
            }
            engine.MeshBVHManager = manager;
        },
        dispose(engine) {
            engine.MeshBVHManager.dispose();
            delete engine.MeshBVHManager;
        },
    };
};
