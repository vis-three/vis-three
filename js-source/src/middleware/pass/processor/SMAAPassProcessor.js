import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass";
import { defineProcessor } from "../../../core/Processor";
import { CONFIGTYPE } from "../../constants/configType";
export default defineProcessor({
    configType: CONFIGTYPE.SMAAPASS,
    create(config, engine) {
        const pass = new SMAAPass(engine.dom.offsetWidth, engine.dom.offsetHeight);
        return pass;
    },
    dispose(pass) {
        // pass.dispose();
    },
});
//# sourceMappingURL=SMAAPassProcessor.js.map