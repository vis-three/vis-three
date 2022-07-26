import { Mesh } from "three";
import { defineProcessor } from "../../core/Processor";
import { CONFIGTYPE } from "../constants/configType";
import { solidObjectCommands, solidObjectCreate, solidObjectDispose, } from "../solidObject/SolidObjectProcessor";
export default defineProcessor({
    configType: CONFIGTYPE.MESH,
    commands: solidObjectCommands,
    create(config, engine) {
        return solidObjectCreate(new Mesh(), config, {}, engine);
    },
    dispose: solidObjectDispose,
});
//# sourceMappingURL=MeshProcessor.js.map