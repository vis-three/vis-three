import { Engine, Plugin } from "@vis-three/core";
import { Optional, transPkgName } from "@vis-three/utils";
import { Mesh, Object3D } from "three";
import { CastOptions, MeshBVHManager } from "./MeshBVHManager";
import { name as pkgname } from "./package.json";

export interface MeshBVHEngine extends Engine {
  meshBVHManager: MeshBVHManager;
  addBVH: (mesh: Mesh) => MeshBVHEngine;
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
        engine.scene.add(manager.visualizer! as unknown as Object3D);
      }

      if (params.shapecast) {
        manager.castOptions = params.shapecast;
      }

      engine.meshBVHManager = manager;

      engine.addBVH = function (mesh: Mesh) {
        manager.addBVH(mesh);
        return engine;
      };
    },
    dispose(engine: Optional<MeshBVHEngine, "meshBVHManager" | "addBVH">) {
      engine.meshBVHManager!.dispose();
      delete engine.meshBVHManager;
      delete engine.addBVH;
    },
  };
};
