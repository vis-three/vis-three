import { defineProcessor, EngineSupport } from "@vis-three/middleware";
import { SkinnedMeshCompiler } from "../SkinnedMeshCompiler";
import { getSkinnedMeshConfig, SkinnedMeshConfig } from "../SkinnedMeshConfig";
import { Skeleton, SkinnedMesh } from "three";
import { solidObjectCreate } from "@vis-three/module-solid-object";

export default defineProcessor<
  SkinnedMeshConfig,
  SkinnedMesh,
  EngineSupport,
  SkinnedMeshCompiler
>({
  type: "SkinnedMesh",
  config: getSkinnedMeshConfig,
  commands: {
    add: {},
    set: {},
    delete: {},
  },
  create(config, engine) {
    const skinnedMesh = solidObjectCreate(
      new SkinnedMesh(),
      config,
      {
        skeleton: true,
      },
      engine
    );

    if (config.skeleton) {
      const skeleton = engine.getObjectBySymbol(config.skeleton) as Skeleton;

      if (!skeleton) {
        console.warn(
          `skinnedMesh processor can not found skeleton in engine: ${config.skeleton}`
        );
      }

      skinnedMesh.bind(skeleton);
    }

    return skinnedMesh;
  },
  dispose() {},
});
