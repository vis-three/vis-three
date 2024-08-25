import { defineModule, SUPPORT_LIFE_CYCLE } from "@vis-three/tdcm";
import { ObjectRule } from "@vis-three/module-object";
import {
  defineSolidObjectModel,
  SolidObjectModel,
} from "@vis-three/module-solid-object";
import { getMeshConfig, MeshConfig } from "./MeshConfig";
import { Mesh } from "three";

export * from "./MeshConfig";

export default defineModule({
  type: "mesh",
  object: true,
  models: [
    defineSolidObjectModel<MeshConfig, Mesh>((solidObjectModel) => ({
      type: "Mesh",
      config: getMeshConfig,
      create({ model, config, engine }) {
        const mesh = new Mesh();

        mesh.morphTargetInfluences = JSON.parse(
          JSON.stringify(config.morphTargetInfluences)
        );
        mesh.morphTargetDictionary = JSON.parse(
          JSON.stringify(config.morphTargetDictionary)
        );

        solidObjectModel.create!({
          model: model as unknown as SolidObjectModel,
          config,
          engine,
          target: mesh,
          filter: {
            morphTargetInfluences: true,
            morphTargetDictionary: true,
          },
        });

        return mesh;
      },
      dispose({ target }) {
        solidObjectModel.dispose!({ target });
      },
    })),
  ],
  rule: ObjectRule,
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE,
});
