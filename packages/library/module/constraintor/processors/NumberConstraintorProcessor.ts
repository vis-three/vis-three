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

const cacheEventMap: WeakMap<
  NumberConstraintor,
  { object: string; attr: string; event: () => void }
> = new WeakMap();

const bindEvent = function (
  constraintor: NumberConstraintor,
  config: NumberConstraintorConfig,
  engine: EngineSupport
) {
  constraintor.constrain();

  const refObject = engine.getObjectBySymbol(config.ref)!;

  if (refObject) {
    const event = () => {
      constraintor.constrain();
    };

    cacheEventMap.set(constraintor, {
      object: config.ref,
      attr: config.refAttr,
      event,
    });

    Bus.compilerEvent.on(
      refObject,
      `${COMPILER_EVENT.COMPILE}:${config.refAttr}`,
      event
    );
  }
};

const unbindEvent = function (
  constraintor: NumberConstraintor,
  engine: EngineSupport
) {
  const last = cacheEventMap.get(constraintor);
  if (!last) {
    return;
  }

  Bus.compilerEvent.off(
    engine.getObjectBySymbol(last.object)!,
    `${COMPILER_EVENT.COMPILE}:${last.attr}`,
    last.event
  );

  cacheEventMap.delete(constraintor);
};

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
          unbindEvent(target, engine);

          target.setReference(
            engine.getConfigBySymbol(config.ref)!,
            config.refAttr
          );

          bindEvent(target, config, engine);
        }
      },
      refAttr({ target, config, engine }) {
        if (config.ref && config.refAttr) {
          unbindEvent(target, engine);

          target.setReference(
            engine.getConfigBySymbol(config.ref)!,
            config.refAttr
          );

          bindEvent(target, config, engine);
        }
      },
      $reg: [commonRegCommand],
    },
  },
  create(config, engine) {
    const constraintor = new NumberConstraintor(
      engine.getConfigBySymbol(config.target)!,
      config.targetAttr,
      engine.getConfigBySymbol(config.ref)!,
      config.refAttr,
      config.offset ? ({ ...config.offset } as unknown as null) : null
    );

    bindEvent(constraintor, config, engine);

    return constraintor;
  },
  dispose(target, engine) {
    unbindEvent(target, engine);
  },
});
