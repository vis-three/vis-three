import { MeshBasicMaterial } from "three";
import { getMeshBasicMaterialConfig, } from "./MaterialConfig";
import { colorSetHandler, commonMapRegCommand, commonNeedUpdatesRegCommand, create, dispose, } from "./common";
import { defineProcessor } from "@vis-three/middleware";
export default defineProcessor({
    type: "MeshBasicMaterial",
    config: getMeshBasicMaterialConfig,
    commands: {
        set: {
            color: colorSetHandler,
            $reg: [commonMapRegCommand, commonNeedUpdatesRegCommand],
        },
    },
    create: function (config, engine) {
        return create(new MeshBasicMaterial(), config, engine);
    },
    dispose,
});
