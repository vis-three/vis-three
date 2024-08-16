import { SUPPORT_LIFE_CYCLE } from "@vis-three/tdcm";
import { defineModule } from "@vis-three/tdcm";
import { defineObjectModel, ObjectRule } from "@vis-three/module-object";
import { getObject3DConfig, Object3DConfig } from "./Object3DConfig";
import { Object3D } from "three";

export * from "./Object3DConfig";

export default defineModule({
  type: "object3D",
  object: true,
  rule: ObjectRule,
  models: [
    defineObjectModel<Object3DConfig, Object3D>((objectModel) => ({
      type: "Object3D",
      config: getObject3DConfig,
      create({ model, config, engine }) {
        const object = new Object3D();

        objectModel.create!({
          model,
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
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE,
});
