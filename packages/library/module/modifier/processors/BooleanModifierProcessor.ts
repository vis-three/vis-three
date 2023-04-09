import {
  Bus,
  COMPILER_EVENT,
  defineProcessor,
  EngineSupport,
  globalAntiShake,
} from "@vis-three/middleware";
import { Modifier } from "@vis-three/modifier-base";
import { BooleanModifier } from "@vis-three/library-modifier";
import { syncObject } from "@vis-three/utils";
import { Mesh } from "three";
import { ModifierCompiler } from "../ModifierCompiler";
import {
  BooleanModifierConfig,
  getBooleanModifierConfig,
} from "../ModifierConfig";

const modifyKey = [
  "position.x",
  "position.y",
  "position.z",
  "rotation.x",
  "rotation.y",
  "rotation.z",
  "scale.x",
  "scale.y",
  "scale.z",
  "parent",
];

const cacheTarget: Map<Modifier, object> = new Map();

export default defineProcessor<
  BooleanModifierConfig,
  BooleanModifier,
  EngineSupport,
  ModifierCompiler
>({
  type: "BooleanModifier",
  config: getBooleanModifierConfig,
  commands: {
    set: {
      source: () => {},
      target: ({ target: modifier, config, engine, compiler }) => {
        globalAntiShake.exec((finish) => {
          if (config.target) {
            const target = engine.compilerManager.getObjectBySymbol(
              config.target
            ) as Mesh;
            if (!target) {
              finish &&
                console.warn(
                  `Boolean modifier processor can not found object by vid: ${config.target}`
                );
              return false;
            }
            modifier.target = target;

            const renderFun = compiler.cacheRenderFun.get(modifier)!;

            if (!renderFun) {
              console.error(
                `can not found cache render fun in ${compiler.MODULE} compiler`
              );
              return true;
            }

            const oldTarget = cacheTarget.get(modifier) as Mesh;

            if (oldTarget) {
              for (const key of modifyKey) {
                Bus.compilerEvent.off(
                  oldTarget,
                  `${COMPILER_EVENT.COMPILE}:${key}`,
                  renderFun
                );
              }

              Bus.compilerEvent.off(
                oldTarget.geometry,
                `${COMPILER_EVENT.COMPILE}:update`,
                renderFun
              );
            }

            for (const key of modifyKey) {
              Bus.compilerEvent.on(
                target,
                `${COMPILER_EVENT.COMPILE}:${key}`,
                renderFun
              );
            }

            Bus.compilerEvent.on(
              target.geometry,
              `${COMPILER_EVENT.COMPILE}:update`,
              renderFun
            );

            cacheTarget.set(modifier, target);
            renderFun();
            return true;
          }
          return true;
        });
      },
      $reg: [
        {
          reg: new RegExp(".*"),
          handler({ value, key, target: modifier, compiler }) {
            modifier[key] = value;

            const renderFun = compiler.cacheRenderFun.get(modifier)!;

            if (!renderFun) {
              console.error(
                `can not found cache render fun in ${compiler.MODULE} compiler`
              );
              return;
            }

            renderFun();
          },
        },
      ],
    },
  },
  create: function (
    config: BooleanModifierConfig,
    engine: EngineSupport,
    compiler: ModifierCompiler
  ): BooleanModifier {
    const modifier = new BooleanModifier({
      mode: config.mode as any,
    });

    const renderFun = () => {
      modifier.render();
      compiler.chainRender(modifier);
    };

    compiler.cacheRenderFun.set(modifier, renderFun);

    globalAntiShake.exec((finish) => {
      if (config.source) {
        const source = engine.compilerManager.getObjectBySymbol(
          config.source
        ) as Mesh;
        if (!source) {
          finish &&
            console.warn(
              `Boolean modifier processor can not found object by vid: ${config.source}`
            );
          return false;
        }
        modifier.source = source;

        for (const key of modifyKey) {
          Bus.compilerEvent.on(
            source,
            `${COMPILER_EVENT.COMPILE}:${key}`,
            renderFun
          );
        }

        Bus.compilerEvent.on(
          source.geometry,
          `${COMPILER_EVENT.COMPILE}:update`,
          renderFun
        );

        compiler.integrateModifer(modifier);

        renderFun();
        return true;
      }
      return true;
    });

    globalAntiShake.exec((finish) => {
      if (config.target) {
        const target = engine.compilerManager.getObjectBySymbol(
          config.target
        ) as Mesh;
        if (!target) {
          finish &&
            console.warn(
              `Boolean modifier processor can not found object by vid: ${config.target}`
            );
          return false;
        }
        modifier.target = target;

        for (const key of modifyKey) {
          Bus.compilerEvent.on(
            target,
            `${COMPILER_EVENT.COMPILE}:${key}`,
            renderFun
          );
        }

        Bus.compilerEvent.on(
          target.geometry,
          `${COMPILER_EVENT.COMPILE}:update`,
          renderFun
        );

        cacheTarget.set(modifier, target);
        renderFun();
        return true;
      }
      return true;
    });

    syncObject(config, modifier, { target: true, source: true });

    return modifier;
  },
  dispose: function (
    target: BooleanModifier,
    engine: EngineSupport,
    compiler: ModifierCompiler
  ): void {
    target.dispose();
  },
});
