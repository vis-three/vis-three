import {
  defineSolidObjectModel,
  SolidObjectModel,
} from "@vis-three/module-solid-object";
import { getSkinnedMeshConfig, SkinnedMeshConfig } from "../SkinnedMeshConfig";
import { Matrix4, Matrix4Tuple, Skeleton, SkinnedMesh } from "three";

export default defineSolidObjectModel<SkinnedMeshConfig, SkinnedMesh>(
  (solidObjectModel) => ({
    type: "SkinnedMesh",
    config: getSkinnedMeshConfig,
    commands: {
      add: {},
      set: {},
      delete: {},
    },
    create({ model, config, engine }) {
      const skinnedMesh = new SkinnedMesh();

      solidObjectModel.create!({
        model: model as unknown as SolidObjectModel,
        target: skinnedMesh,
        config,
        engine,
        filter: {
          skeleton: true,
        },
      });

      if (config.skeleton) {
        const skeleton = engine.getObjectBySymbol(config.skeleton) as Skeleton;

        if (!skeleton) {
          console.warn(
            `skinnedMesh processor can not found skeleton in engine: ${config.skeleton}`
          );
        }

        model.toTrigger("object", () => {
          if (config.bindMatrix.length) {
            const matrix = new Matrix4();
            matrix.elements = (<number[]>[]).concat(
              config.bindMatrix
            ) as unknown as Matrix4Tuple;
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
  })
);
