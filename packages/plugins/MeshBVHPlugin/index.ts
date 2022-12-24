import { Engine, Plugin } from "@vis-three/core";
import { Optional, transPkgName } from "@vis-three/utils";
import { CastOptions, MeshBVHManager } from "./MeshBVHManager";
import { name as pkgname } from "./package.json";

export interface MeshBVHEngine extends Engine {
  MeshBVHManager: MeshBVHManager;
}

export interface MeshBVHPluginParameters {
  visualizer?: boolean;
  shapecast?: CastOptions;
}

export const MESH_BVH_PLUGIN = transPkgName(pkgname);

export const MeshBVHPlugin: Plugin<MeshBVHEngine> = function (
  params: MeshBVHPluginParameters = {}
) {
  return {
    name: MESH_BVH_PLUGIN,
    install(engine) {
      const manager = new MeshBVHManager();

      if (params.visualizer) {
        manager.createVisualizer();
        engine.scene.add(manager.visualizer!);
      }

      if (params.shapecast) {
        manager.castOptions = params.shapecast;
      }

      engine.MeshBVHManager = manager;
    },
    dispose(engine: Optional<MeshBVHEngine, "MeshBVHManager">) {
      engine.MeshBVHManager!.dispose();
      delete engine.MeshBVHManager;
    },
  };
};
