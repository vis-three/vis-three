import { AmbientLight } from "three";
import { defineProcessor } from "../../../core/Processor";
import { CONFIGTYPE } from "../../constants/configType";
import { objectDispose } from "../../object/ObjectProcessor";
import { lightCommands, lightCreate } from "./common";
export default defineProcessor({
    configType: CONFIGTYPE.AMBIENTLIGHT,
    commands: lightCommands,
    create(config, engine) {
        return lightCreate(new AmbientLight(), config, {}, engine);
    },
    dispose: objectDispose,
});
//# sourceMappingURL=AmbientLightProcessor.js.map