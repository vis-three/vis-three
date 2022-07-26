import { LineBasicMaterial } from "three";
import { defineProcessor } from "../../../core/Processor";
import { CONFIGTYPE } from "../../constants/configType";
import { colorSetHandler, commonMapRegCommand, commonNeedUpdatesRegCommand, create, dispose, } from "./common";
export default defineProcessor({
    configType: CONFIGTYPE.LINEBASICMATERIAL,
    commands: {
        set: {
            color: colorSetHandler,
            $reg: [commonMapRegCommand, commonNeedUpdatesRegCommand],
        },
    },
    create: function (config, engine) {
        return create(new LineBasicMaterial(), config, engine);
    },
    dispose,
});
//# sourceMappingURL=LineBasicMaterialProcessor.js.map