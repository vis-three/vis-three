import { defineModel, JSONHandler, MODEL_EVENT } from "@vis-three/tdcm";
import {
  BoundingBoxConstraintorConfig,
  getBoundingBoxConstraintorConfig,
} from "../ConstraintorConfig";
import { BoundingBoxConstraintor } from "@vis-three/library-constraintor";
import { commonRegCommand } from "./common";
import { Mesh } from "three";

export default defineModel<
  BoundingBoxConstraintorConfig,
  BoundingBoxConstraintor,
  { constrainFun: () => void }
>({
  type: "BoundingBoxConstraintor",
  config: getBoundingBoxConstraintorConfig,
  context({ model }) {
    return {
      constrainFun: () => {
        model.puppet.constrain();
      },
    };
  },
  commands: {
    set: {
      target({ target, config, engine }) {
        if (config.target && config.targetAttr) {
          target.setTarget(
            engine.getConfigBySymbol(config.target)!,
            config.targetAttr
          );

          target.constrain();
        }
      },
      targetAttr({ target, config, engine }) {
        if (config.target && config.targetAttr) {
          target.setTarget(
            engine.getConfigBySymbol(config.target)!,
            config.targetAttr
          );

          target.constrain();
        }
      },

      ref({ model, target, config, engine, value }) {
        model
          .toModel(config.ref)
          ?.off(MODEL_EVENT.COMPILED_UPDATE, model.constrainFun);

        if (!value) {
          return;
        }

        const refObject = engine.getObjectBySymbol(config.ref)! as Mesh;

        if (!refObject) {
          console.warn(
            `BoundingBox constraintor processor: can not found object: ${config.ref}`
          );
          return;
        }

        target.setReference(refObject);

        target.constrain();

        model
          .toModel(config.ref)
          ?.on(MODEL_EVENT.COMPILED_UPDATE, model.constrainFun);
      },
      $reg: [commonRegCommand],
    },
  },
  create({ model, config, engine }) {
    const refObject = model.toObject<Mesh>(config.ref);

    const constraintor = new BoundingBoxConstraintor(
      model.toConfig(config.target)!,
      config.targetAttr,
      config.space,
      refObject,
      JSONHandler.clone(config.offset) as unknown as undefined
    );

    if (refObject) {
      constraintor.constrain();

      model
        .toModel(config.ref)
        ?.on(MODEL_EVENT.COMPILED_UPDATE, model.constrainFun);
    }

    return constraintor;
  },
  dispose({ model, config }) {
    model
      .toModel(config.ref)
      ?.off(MODEL_EVENT.COMPILED_UPDATE, model.constrainFun);
  },
});
