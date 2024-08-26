import { defineModel } from "@vis-three/tdcm";
import { getUnrealBloomPassConfig, UnrealBloomPassConfig } from "../PassConfig";
import { ComposerEngineSupport, PassCompiler } from "../PassCompiler";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { Vector2 } from "three";

export default defineModel<
  UnrealBloomPassConfig,
  UnrealBloomPass,
  {},
  {},
  ComposerEngineSupport,
  PassCompiler
>({
  type: "UnrealBloomPass",
  config: getUnrealBloomPassConfig,
  create({ config, engine }) {
    const pixelRatio = window.devicePixelRatio;

    const pass = new UnrealBloomPass(
      new Vector2(
        engine.dom
          ? engine.dom.offsetWidth * pixelRatio
          : window.innerWidth * pixelRatio,
        engine.dom
          ? engine.dom.offsetHeight * pixelRatio
          : window.innerWidth * pixelRatio
      ),
      config.strength,
      config.radius,
      config.threshold
    );

    return pass;
  },
  dispose({ target }) {
    target.dispose();
  },
});
