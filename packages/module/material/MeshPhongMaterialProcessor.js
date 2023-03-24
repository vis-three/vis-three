import { MeshPhongMaterial } from "three";
import { getMeshPhongMaterialConfig, } from "./MaterialConfig";
import { colorSetHandler, commonMapRegCommand, commonNeedUpdatesRegCommand, create, dispose, } from "./common";
import { defineProcessor } from "@vis-three/middleware";
export default defineProcessor({
    type: "MeshPhongMaterial",
    config: getMeshPhongMaterialConfig,
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
