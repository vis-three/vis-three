import { defineModule, SUPPORT_LIFE_CYCLE } from "@vis-three/tdcm";
import {
  defineObjectModel,
  ObjectModel,
  ObjectRule,
} from "@vis-three/module-object";
import { getGroupConfig, GroupConfig } from "./GroupConfig";
import { Group } from "three";

export * from "./GroupConfig";

export default defineModule({
  type: "group",
  object: true,
  rule: ObjectRule,
  models: [
    defineObjectModel<GroupConfig, Group>((objectModel) => ({
      type: "Group",
      config: getGroupConfig,
      create({ model, config, engine }) {
        const object = new Group();

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
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE,
});
