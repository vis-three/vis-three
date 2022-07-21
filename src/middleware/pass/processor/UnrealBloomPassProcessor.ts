import { Vector2 } from "three";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { defineProcessor } from "../../../core/Processor";
import { CONFIGTYPE } from "../../constants/configType";
import { UnrealBloomPassConfig } from "../PassConfig";

export default defineProcessor<UnrealBloomPassConfig, UnrealBloomPass>({
  configType: CONFIGTYPE.UNREALBLOOMPASS,
  create(config): UnrealBloomPass {
    const pass = new UnrealBloomPass(
      new Vector2(config.resolution.x, config.resolution.y),
      config.strength,
      config.radius,
      config.threshold
    );

    return pass;
  },
  dispose(pass) {
    pass.dispose();
  },
});
