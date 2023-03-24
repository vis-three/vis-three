import { SpriteMaterial } from "three";
import { getSpriteMaterialConfig, } from "./MaterialConfig";
import { colorSetHandler, commonMapRegCommand, commonNeedUpdatesRegCommand, create, dispose, } from "./common";
import { defineProcessor } from "@vis-three/middleware";
export default defineProcessor({
    type: "SpriteMaterial",
    config: getSpriteMaterialConfig,
    commands: {
        set: {
            color: colorSetHandler,
            $reg: [commonMapRegCommand, commonNeedUpdatesRegCommand],
        },
    },
    create: function (config, engine) {
        return create(new SpriteMaterial(), config, engine);
    },
    dispose,
});
