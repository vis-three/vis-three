import { Vector2 } from "three";
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass";
import { defineProcessor } from "../../../core/Processor";
import { SetSizeEvent } from "../../../engine/Engine";
import { CONFIGTYPE } from "../../constants/configType";
import { SMAAPassConfig } from "../PassConfig";

export default defineProcessor<SMAAPassConfig, SMAAPass>({
  configType: CONFIGTYPE.SMAAPASS,
  create(config, engine): SMAAPass {
    const pass = new SMAAPass(
      engine.dom!.offsetWidth,
      engine.dom!.offsetHeight
    );
    return pass;
  },
  dispose(pass) {
    // pass.dispose();
  },
});
