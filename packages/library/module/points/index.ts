import { defineModule, SUPPORT_LIFE_CYCLE } from "@vis-three/tdcm";
import {
  defineSolidObjectModel,
  SolidObjectModel,
} from "@vis-three/module-solid-object";
import { getPointsConfig, PointsConfig } from "./PointsConfig";
import { Points } from "three";
import { ObjectRule } from "@vis-three/module-object";

export * from "./PointsConfig";

export default defineModule({
  type: "points",
  object: true,
  models: [
    defineSolidObjectModel<PointsConfig, Points>((solidObjectModel) => ({
      type: "Points",
      config: getPointsConfig,
      create({ model, config, engine }) {
        const mesh = new Points();

        solidObjectModel.create!({
          model: model as unknown as SolidObjectModel,
          config,
          engine,
          target: mesh,
          filter: {},
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
