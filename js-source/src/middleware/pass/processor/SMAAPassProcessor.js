import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass";
import { defineProcessor } from "../../../core/Processor";
import { CONFIGTYPE } from "../../constants/configType";
export default defineProcessor({
    configType: CONFIGTYPE.SMAAPASS,
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
//# sourceMappingURL=SMAAPassProcessor.js.map