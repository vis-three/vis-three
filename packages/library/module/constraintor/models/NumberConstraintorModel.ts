import { NumberConstraintor } from "@vis-three/library-constraintor";
import { defineModel, MODEL_EVENT } from "@vis-three/tdcm";
import {
  getNumberConstraintorConfig,
  NumberConstraintorConfig,
} from "../ConstraintorConfig";
import { commonRegCommand } from "./common";

export default defineModel<
  NumberConstraintorConfig,
  NumberConstraintor,
  {
    constrainFun: () => void;
  }
>({
  type: "NumberConstraintor",
  config: getNumberConstraintorConfig,
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
      ref({ target, config, engine, model }) {
        if (config.ref && config.refAttr) {
          model
            .toModel(config.ref)
            ?.off(MODEL_EVENT.COMPILED_UPDATE, model.constrainFun);

          target.setReference(
            engine.getConfigBySymbol(config.ref)!,
            config.refAttr
          );

          model
            .toModel(config.ref)
            ?.on(MODEL_EVENT.COMPILED_UPDATE, model.constrainFun);
        }
      },
      refAttr({ target, config, engine, model }) {
        if (config.ref && config.refAttr) {
          model
            .toModel(config.ref)
            ?.off(MODEL_EVENT.COMPILED_UPDATE, model.constrainFun);

          target.setReference(
            engine.getConfigBySymbol(config.ref)!,
            config.refAttr
          );

          model
            .toModel(config.ref)
            ?.on(MODEL_EVENT.COMPILED_UPDATE, model.constrainFun);
        }
      },
      $reg: [commonRegCommand],
    },
  },

  create({ model, config, engine }) {
    const constraintor = new NumberConstraintor(
      engine.getConfigBySymbol(config.target)!,
      config.targetAttr,
      engine.getConfigBySymbol(config.ref)!,
      config.refAttr,
      config.offset ? ({ ...config.offset } as unknown as null) : null
    );

    model
      .toModel(config.ref)
      ?.on(MODEL_EVENT.COMPILED_UPDATE, model.constrainFun);

    constraintor.constrain();

    return constraintor;
  },
  dispose({ model, config }) {
    model
      .toModel(config.ref)
      ?.off(MODEL_EVENT.COMPILED_UPDATE, model.constrainFun);
  },
});
