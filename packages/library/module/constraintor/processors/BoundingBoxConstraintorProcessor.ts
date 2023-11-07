import {
  Bus,
  COMPILER_EVENT,
  defineProcessor,
  EngineSupport,
} from "@vis-three/middleware";
import { ConstraintorCompiler } from "../ConstraintorCompiler";
import {
  getNumberConstraintorConfig,
  NumberConstraintorConfig,
} from "../ConstraintorConfig";
import { NumberConstraintor } from "@vis-three/library-constraintor";
import { commonRegCommand } from "./common";

const cacheEventMap: WeakMap<NumberConstraintor, () => void> = new WeakMap();

export default defineProcessor<
  NumberConstraintorConfig,
  NumberConstraintor,
  EngineSupport,
  ConstraintorCompiler
>({
  type: "NumberConstraintor",
  config: getNumberConstraintorConfig,
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
      ref({ target, config, engine }) {
        if (config.ref && config.refAttr) {
          target.setReference(
            engine.getConfigBySymbol(config.ref)!,
            config.refAttr
          );

          target.constrain();
        }
      },
      refAttr({ target, config, engine }) {
        if (config.ref && config.refAttr) {
          target.setReference(
            engine.getConfigBySymbol(config.ref)!,
            config.refAttr
          );

          target.constrain();
        }
      },
      $reg: [commonRegCommand],
    },
  },
  create(config, engine) {
    const refObject = engine.getObjectBySymbol(config.ref)!;

    const constraintor = new NumberConstraintor(
      engine.getConfigBySymbol(config.target)!,
      config.targetAttr,
      engine.getConfigBySymbol(config.ref)!,
      config.refAttr,
      config.offset ? ({ ...config.offset } as unknown as null) : null
    );

    if (refObject) {
      constraintor.constrain();

      const event = () => {
        constraintor.constrain();
      };

      cacheEventMap.set(constraintor, event);

      Bus.compilerEvent.on(
        refObject,
        `${COMPILER_EVENT.COMPILE}:${config.refAttr}`,
        event
      );
    }

    return constraintor;
  },
  dispose(target) {
    cacheEventMap.delete(target);
  },
});
