import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass";
import { CONFIGTYPE } from "../../constants/configType";
import { EngineSupport } from "../../engine";
import { defineProcessor } from "../../module";
import { SMAAPassConfig } from "../PassConfig";

export default defineProcessor<SMAAPassConfig, SMAAPass, EngineSupport>({
  configType: CONFIGTYPE.SMAAPASS,
  create(config, engine): SMAAPass {
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
  dispose(pass) {
    // pass.dispose();
  },
});
