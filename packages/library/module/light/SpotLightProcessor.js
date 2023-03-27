import { SpotLight } from "three";
import { getSpotLightConfig } from "./LightConfig";
import { lightCommands, lightCreate } from "./common";
import { defineProcessor } from "@vis-three/middleware";
import { objectDispose } from "@vis-three/module-object";
export default defineProcessor({
    type: "SpotLight",
    config: getSpotLightConfig,
    commands: lightCommands,
    create(config, engine) {
        return lightCreate(new SpotLight(), config, {}, engine);
    },
    dispose: objectDispose,
});
