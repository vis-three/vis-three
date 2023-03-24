import {
  AniScriptGeneratorManager,
  defineProcessor,
  EngineSupport,
  RenderEvent,
} from "@vis-three/middleware";
import { AnimationCompiler } from "./AnimationCompiler";
import {
  getScriptAnimationConfig,
  ScriptAnimationConfig,
} from "./AnimationConfig";

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
  EngineSupport,
  AnimationCompiler
>({
  type: "ScriptAnimation",
  config: getScriptAnimationConfig,
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
          handler({ config, engine, compiler }) {
            const fun = config[Symbol.for(compiler.scriptAniSymbol)];
            engine.renderManager.removeEventListener("render", fun);
            const newFun = createFunction(config, engine);
            config[Symbol.for(compiler.scriptAniSymbol)] = newFun;

            config.play && engine.renderManager.addEventListener("render", fun);
          },
        },
      ],
    },
  },
  create(
    config: ScriptAnimationConfig,
    engine: EngineSupport,
    compiler: AnimationCompiler
  ): (event: RenderEvent) => void {
    const fun = createFunction(config, engine);

    config.play && engine.renderManager.addEventListener("render", fun);

    config[Symbol.for(compiler.scriptAniSymbol)] = fun;

    return fun;
  },
  dispose() {},
});
