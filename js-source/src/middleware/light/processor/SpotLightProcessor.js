import { SpotLight } from "three";
import { defineProcessor } from "../../../core/Processor";
import { CONFIGTYPE } from "../../constants/configType";
import { objectDispose } from "../../object/ObjectProcessor";
import { lightCommands, lightCreate } from "./common";
export default defineProcessor({
    configType: CONFIGTYPE.SPOTLIGHT,
    commands: lightCommands,
    create(config, engine) {
        return lightCreate(new SpotLight(), config, {}, engine);
    },
    dispose: objectDispose,
});
//# sourceMappingURL=SpotLightProcessor.js.map