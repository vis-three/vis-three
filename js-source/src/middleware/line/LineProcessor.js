import { Line } from "three";
import { defineProcessor } from "../../core/Processor";
import { CONFIGTYPE } from "../constants/configType";
import { solidObjectCommands, solidObjectCreate, solidObjectDispose, } from "../solidObject/SolidObjectProcessor";
export default defineProcessor({
    configType: CONFIGTYPE.LINE,
    commands: solidObjectCommands,
    create(config, engine) {
        return solidObjectCreate(new Line(), config, {}, engine);
    },
    dispose: solidObjectDispose,
});
//# sourceMappingURL=LineProcessor.js.map