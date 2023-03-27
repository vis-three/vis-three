import { defineProcessor } from "@vis-three/middleware";
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass";
import { getSMAAPassConfig } from "./PassConfig";
export default defineProcessor({
    type: "SMAAPass",
    config: getSMAAPassConfig,
    create(config, engine) {
        const pixelRatio = window.devicePixelRatio;
        const pass = new SMAAPass(engine.dom
            ? engine.dom.offsetWidth * pixelRatio
            : window.innerWidth * pixelRatio, engine.dom
            ? engine.dom.offsetHeight * pixelRatio
            : window.innerWidth * pixelRatio);
        return pass;
    },
    dispose(pass) {
        // pass.dispose();
    },
});
