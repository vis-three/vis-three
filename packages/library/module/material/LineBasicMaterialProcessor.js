import { LineBasicMaterial } from "three";
import { getLineBasicMaterialConfig, } from "./MaterialConfig";
import { colorSetHandler, commonMapRegCommand, commonNeedUpdatesRegCommand, create, dispose, } from "./common";
import { defineProcessor } from "@vis-three/middleware";
export default defineProcessor({
    type: "LineBasicMaterial",
    config: getLineBasicMaterialConfig,
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
