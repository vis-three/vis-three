import { defineModel } from "@vis-three/tdcm";
import { getSMAAPassConfig, SMAAPassConfig } from "../PassConfig";
import { ComposerEngineSupport, PassCompiler } from "../PassCompiler";
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass.js";

export default defineModel<
  SMAAPassConfig,
  SMAAPass,
  {},
  {},
  ComposerEngineSupport,
  PassCompiler
>({
  type: "SMAAPass",
  config: getSMAAPassConfig,
  create({ config, engine }) {
    const pixelRatio = window.devicePixelRatio;

    const pass = new SMAAPass(
      engine.dom
        ? engine.dom.offsetWidth * pixelRatio
        : window.innerWidth * pixelRatio,
      engine.dom
        ? engine.dom.offsetHeight * pixelRatio
        : window.innerWidth * pixelRatio
    );
    return pass;
  },
  dispose(target) {},
});
