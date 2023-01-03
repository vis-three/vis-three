import { RenderEvent } from "@vis-three/render-manager-plugin";
import { CONFIGTYPE } from "../../constants/CONFIGTYPE";
import { EngineSupport } from "../../engine";
import { AniScriptGeneratorManager } from "../../manager/AniScriptGeneratorManager";
import { defineProcessor } from "../../module";
import { ScriptAnimationConfig } from "../AnimationConfig";
import { scriptAniSymbol } from "./common";

const createFunction = function (
  config: ScriptAnimationConfig,
  engine: EngineSupport
): (event: RenderEvent) => void {
  let object = engine.compilerManager.getObjectBySymbol(config.target)!;

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
};

export default defineProcessor<
  ScriptAnimationConfig,
  (event: RenderEvent) => void,
  EngineSupport
>({
  configType: CONFIGTYPE.SCRIPTANIMATION,
  commands: {
    set: {
      play({ target, engine, value }) {
        if (value) {
          engine.renderManager.addEventListener<RenderEvent>("render", target);
        } else {
          engine.renderManager.removeEventListener<RenderEvent>(
            "render",
            target
          );
        }
      },
      $reg: [
        {
          reg: new RegExp(".*"),
          handler({ config, engine }) {
            const fun = config[Symbol.for(scriptAniSymbol)];
            engine.renderManager.removeEventListener("render", fun);
            const newFun = createFunction(config, engine);
            config[Symbol.for(scriptAniSymbol)] = newFun;

            config.play && engine.renderManager.addEventListener("render", fun);
          },
        },
      ],
    },
  },
  create(
    config: ScriptAnimationConfig,
    engine: EngineSupport
  ): (event: RenderEvent) => void {
    const fun = createFunction(config, engine);

    config.play && engine.renderManager.addEventListener("render", fun);

    config[Symbol.for(scriptAniSymbol)] = fun;

    return fun;
  },
  dispose() {},
});
