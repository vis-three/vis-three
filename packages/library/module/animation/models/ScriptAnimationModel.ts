import {
  defineModel,
  EngineSupport,
  MODULE_TYPE,
  RenderEvent,
} from "@vis-three/tdcm";
import {
  getScriptAnimationConfig,
  ScriptAnimationConfig,
} from "../AnimationConfig";
import { ENGINE_EVENT } from "@vis-three/core";
import { AniScriptGeneratorManager } from "../AniScriptGeneratorManager";

export default defineModel<
  ScriptAnimationConfig,
  (event: RenderEvent) => void,
  {},
  {
    eventSymbol: string;
    createFunction: (
      config: ScriptAnimationConfig,
      engine: EngineSupport
    ) => (event: RenderEvent) => void;
    restoreAttribute: (
      config: ScriptAnimationConfig,
      engine: EngineSupport
    ) => void;
  }
>({
  type: "ScriptAnimation",
  config: getScriptAnimationConfig,
  shared: {
    eventSymbol: "vis.event",
    createFunction(
      config: ScriptAnimationConfig,
      engine: EngineSupport
    ): (event: RenderEvent) => void {
      let object = engine.compilerManager.getObjectBySymbol(
        config.target as string
      )!;

      if (!object) {
        console.warn(`can not found object in enigne: ${config.target}`);
        return () => {};
      }

      const attributeList = config.attribute.split(".");
      attributeList.shift();

      const attribute = attributeList.pop()!;
      for (const key of attributeList) {
        if (object[key] === undefined) {
          console.warn(
            `animaton processor: target object can not found key: ${key}`,
            object
          );
          return () => {};
        }

        object = object[key];
      }

      return AniScriptGeneratorManager.generateScript(
        engine,
        object,
        attribute,
        config.script
      );
    },
    restoreAttribute(config, engine) {
      if (!config.target || !config.attribute) {
        return this;
      }

      let target = engine.getObjectBySymbol(config.target);
      let configure = engine.getConfigBySymbol(config.target);

      if (!target || !configure) {
        console.warn(
          "scrpit animation model: can not found object target or config in engine",
          config.vid
        );
      }

      const attirbuteList = config.attribute.split(".");

      attirbuteList.shift();

      const attribute = attirbuteList.pop()!;

      for (const key of attirbuteList) {
        if (target[key] && configure[key]) {
          target = target[key];
          configure = configure[key];
        } else {
          console.warn(
            `scrpit animation model: object and config attribute are not sync`
          );

          return this;
        }
      }

      target[attribute] = configure[attribute];
      return this;
    },
  },
  commands: {
    set: {
      play({ target, value, engine }) {
        if (value) {
          engine.renderManager.addEventListener<RenderEvent>(
            ENGINE_EVENT.RENDER,
            target
          );
        } else {
          engine.renderManager.removeEventListener<RenderEvent>(
            ENGINE_EVENT.RENDER,
            target
          );
        }
      },
      $reg: [
        {
          reg: new RegExp(".*"),
          handler({ model, target, config, engine, compiler }) {
            engine.renderManager.removeEventListener<RenderEvent>(
              ENGINE_EVENT.RENDER,
              target
            );

            compiler.symbolMap.delete(target);

            model.restoreAttribute(config, engine);

            const newFun = model.createFunction(config, engine);

            config.play &&
              engine.renderManager.addEventListener<RenderEvent>(
                ENGINE_EVENT.RENDER,
                newFun
              );

            model.puppet = newFun;

            compiler.symbolMap.set(newFun, config.vid);
          },
        },
      ],
    },
  },
  create({ model, config, engine }) {
    const fun = model.createFunction(config, engine);

    config.play &&
      engine.renderManager.addEventListener<RenderEvent>(
        ENGINE_EVENT.RENDER,
        fun
      );

    return fun;
  },
  dispose({ model, target, config, engine }) {
    engine.renderManager.removeEventListener<RenderEvent>(
      ENGINE_EVENT.RENDER,
      target
    );
    model.restoreAttribute(config, engine);
  },
});
