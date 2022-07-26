import { MeshPhongMaterial } from "three";
import { defineProcessor } from "../../../core/Processor";
import { CONFIGTYPE } from "../../constants/configType";
import { colorSetHandler, commonMapRegCommand, commonNeedUpdatesRegCommand, create, dispose, } from "./common";
export default defineProcessor({
    configType: CONFIGTYPE.MESHPHONGMATERIAL,
    commands: {
        set: {
            color: colorSetHandler,
            emissive: colorSetHandler,
            specular: colorSetHandler,
            $reg: [commonMapRegCommand, commonNeedUpdatesRegCommand],
        },
    },
    create: function (config, engine) {
        return create(new MeshPhongMaterial(), config, engine);
    },
    dispose,
});
//# sourceMappingURL=MeshPhongMaterialProcessor.js.map