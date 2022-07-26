import { Group } from "three";
import { defineProcessor } from "../../core/Processor";
import { CONFIGTYPE } from "../constants/configType";
import { objectCommands, objectCreate, objectDispose, } from "../object/ObjectProcessor";
export default defineProcessor({
    configType: CONFIGTYPE.GROUP,
    commands: objectCommands,
    create(config, engine) {
        return objectCreate(new Group(), config, {}, engine);
    },
    dispose: objectDispose,
});
//# sourceMappingURL=GroupProcessor.js.map