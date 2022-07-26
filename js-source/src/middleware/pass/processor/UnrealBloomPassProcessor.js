import { Vector2 } from "three";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { defineProcessor } from "../../../core/Processor";
import { CONFIGTYPE } from "../../constants/configType";
export default defineProcessor({
    configType: CONFIGTYPE.UNREALBLOOMPASS,
    create(config) {
        const pass = new UnrealBloomPass(new Vector2(config.resolution.x, config.resolution.y), config.strength, config.radius, config.threshold);
        return pass;
    },
    dispose(pass) {
        pass.dispose();
    },
});
//# sourceMappingURL=UnrealBloomPassProcessor.js.map