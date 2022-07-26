import { Points } from "three";
import { defineProcessor } from "../../core/Processor";
import { CONFIGTYPE } from "../constants/configType";
import { solidObjectCommands, solidObjectCreate, solidObjectDispose, } from "../solidObject/SolidObjectProcessor";
export default defineProcessor({
    configType: CONFIGTYPE.POINTS,
    commands: solidObjectCommands,
    create(config, engine) {
        return solidObjectCreate(new Points(), config, {}, engine);
    },
    dispose: solidObjectDispose,
});
//# sourceMappingURL=PointsProcessor.js.map