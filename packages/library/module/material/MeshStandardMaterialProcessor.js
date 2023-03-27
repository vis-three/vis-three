import { MeshStandardMaterial } from "three";
import { getMeshStandardMaterialConfig, } from "./MaterialConfig";
import { colorSetHandler, commonMapRegCommand, commonNeedUpdatesRegCommand, create, dispose, } from "./common";
import { defineProcessor } from "@vis-three/middleware";
export default defineProcessor({
    type: "MeshStandardMaterial",
    config: getMeshStandardMaterialConfig,
    commands: {
        set: {
            color: colorSetHandler,
            emissive: colorSetHandler,
            $reg: [commonMapRegCommand, commonNeedUpdatesRegCommand],
        },
    },
    create: function (config, engine) {
        return create(new MeshStandardMaterial(), config, engine);
    },
    dispose,
});
