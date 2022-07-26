import { PointLight } from "three";
import { defineProcessor } from "../../../core/Processor";
import { CONFIGTYPE } from "../../constants/configType";
import { objectDispose } from "../../object/ObjectProcessor";
import { lightCommands, lightCreate } from "./common";
export default defineProcessor({
    configType: CONFIGTYPE.POINTLIGHT,
    commands: lightCommands,
    create(config, engine) {
        return lightCreate(new PointLight(), config, {}, engine);
    },
    dispose: objectDispose,
});
//# sourceMappingURL=PointLightProcessor.js.map