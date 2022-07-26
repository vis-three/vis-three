import { DirectionalLight } from "three";
import { defineProcessor } from "../../../core/Processor";
import { CONFIGTYPE } from "../../constants/configType";
import { objectDispose } from "../../object/ObjectProcessor";
import { lightCommands, lightCreate } from "./common";
export default defineProcessor({
    configType: CONFIGTYPE.DIRECTIONALLIGHT,
    commands: lightCommands,
    create(config, engine) {
        return lightCreate(new DirectionalLight(), config, {}, engine);
    },
    dispose: objectDispose,
});
//# sourceMappingURL=DirectionalLightProcessor.js.map