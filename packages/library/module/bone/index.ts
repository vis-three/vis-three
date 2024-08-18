import { SUPPORT_LIFE_CYCLE } from "@vis-three/tdcm";
import { defineModule } from "@vis-three/tdcm";
import {
  defineObjectModel,
  ObjectModel,
  ObjectRule,
} from "@vis-three/module-object";
import { BoneConfig, getBoneConfig } from "./BoneConfig";
import { Bone } from "three";

export * from "./BoneConfig";

export default defineModule({
  type: "bone",
  object: true,
  rule: ObjectRule,
  models: [
    defineObjectModel<BoneConfig, Bone>((objectModel) => ({
      type: "Bone",
      config: getBoneConfig,
      create({ model, config, engine }) {
        const object = new Bone();

        objectModel.create!({
          model: model as unknown as ObjectModel,
          target: object,
          config,
          filter: {},
          engine,
        });

        return object;
      },
      dispose({ target }) {
        objectModel.dispose!({ target });
      },
    })),
  ],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE - 2,
});
