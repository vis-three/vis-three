import { defineModel, EngineSupport, MODEL_EVENT } from "@vis-three/tdcm";
import {
  BooleanModifierConfig,
  getBooleanModifierConfig,
} from "../ModifierConfig";
import { BooleanModifier } from "@vis-three/library-modifier";
import { Mesh } from "three";
import { ModifierCompiler } from "../ModifierCompiler";
import { syncObject } from "@vis-three/utils";

export default defineModel<
  BooleanModifierConfig,
  BooleanModifier,
  {
    renderFun: () => void;
    cacheTarget: object;
  },
  { modifyKey: string[] },
  EngineSupport,
  ModifierCompiler
>({
  type: "BooleanModifier",
  config: getBooleanModifierConfig,
  shared: {
    modifyKey: [
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
    ],
  },
  context() {
    return {
      renderFun: () => {},
      cacheTarget: {},
    };
  },
  commands: {
    set: {
      source: () => {},
      target: ({ model, target: modifier, config, engine }) => {
        model.toAsync((finish) => {
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

            const oldTarget = model.cacheTarget as Mesh;

            if (oldTarget) {
              const targetModel = model.toModel(oldTarget);

              for (const key of model.modifyKey) {
                targetModel?.off(
                  `${MODEL_EVENT.COMPILED_ATTR}:${key}`,
                  model.renderFun
                );
              }

              model
                .toModel(oldTarget.geometry)
                ?.off(MODEL_EVENT.COMPILED_UPDATE, model.renderFun);
            }

            const targetModel = model.toModel(config.target);
            for (const key of model.modifyKey) {
              targetModel?.off(
                `${MODEL_EVENT.COMPILED_ATTR}:${key}`,
                model.renderFun
              );
            }

            model
              .toModel(target.geometry)
              ?.off(MODEL_EVENT.COMPILED_UPDATE, model.renderFun);

            model.cacheTarget = target;

            model.renderFun();
            return true;
          }
          return true;
        });
      },
      $reg: [
        {
          reg: new RegExp(".*"),
          handler({ model, value, key, target: modifier}) {
            modifier[key] = value;
            model.renderFun();
          },
        },
      ],
    },
  },
  create({ model, config, engine, compiler }) {
    const modifier = new BooleanModifier({
      mode: config.mode as "subtract" | "union" | "intersect",
    });

    model.renderFun = () => {
      modifier.render();
      compiler.chainRender(modifier);
    };

    model.toAsync((finish) => {
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

        const sourceModel = model.toModel(config.source);
        for (const key of model.modifyKey) {
          sourceModel?.on(
            `${MODEL_EVENT.COMPILED_ATTR}:${key}`,
            model.renderFun
          );
        }

        model
          .toModel(source.geometry)
          ?.on(MODEL_EVENT.COMPILED_UPDATE, model.renderFun);

        modifier.source = source;

        compiler.integrateModifer(modifier);

        model.renderFun();
        return true;
      }
      return true;
    });

    model.toAsync((finish) => {
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

        const targetModel = model.toModel(config.target);
        for (const key of model.modifyKey) {
          targetModel?.on(
            `${MODEL_EVENT.COMPILED_ATTR}:${key}`,
            model.renderFun
          );
        }

        model
          .toModel(target.geometry)
          ?.on(MODEL_EVENT.COMPILED_UPDATE, model.renderFun);

        model.cacheTarget = target;

        model.renderFun();
        return true;
      }
      return true;
    });

    syncObject(config, modifier, { target: true, source: true });

    return modifier;
  },
  dispose({ target }) {
    target.dispose();
  },
});
