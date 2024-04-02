import {
  defineProcessor,
  EngineSupport,
  globalObjectModuleTrigger,
} from "@vis-three/middleware";
import { SkinnedMeshCompiler } from "../SkinnedMeshCompiler";
import { getSkinnedMeshConfig, SkinnedMeshConfig } from "../SkinnedMeshConfig";
import { Matrix4, Skeleton, SkinnedMesh } from "three";
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

      globalObjectModuleTrigger.registerExec(() => {
        if (config.bindMatrix.length) {
          const matrix = new Matrix4();
          matrix.elements = (<number[]>[]).concat(config.bindMatrix);
          skinnedMesh.bind(skeleton, matrix);
        } else {
          skinnedMesh.bind(skeleton, skinnedMesh.matrixWorld);
        }

        return false;
      });
    }

    return skinnedMesh;
  },
  dispose() {},
});
