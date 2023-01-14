import { defineProcessor } from "@vis-three/middleware";
import { Vector2 } from "three";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { PASS_CONFIGTYPE } from "../constant";
export default defineProcessor({
    configType: PASS_CONFIGTYPE.UNREALBLOOMPASS,
    create(config, engine) {
        const pixelRatio = window.devicePixelRatio;
        const pass = new UnrealBloomPass(new Vector2(engine.dom
            ? engine.dom.offsetWidth * pixelRatio
            : window.innerWidth * pixelRatio, engine.dom
            ? engine.dom.offsetHeight * pixelRatio
            : window.innerWidth * pixelRatio), config.strength, config.radius, config.threshold);
        return pass;
    },
    dispose(pass) {
        pass.dispose();
    },
});
