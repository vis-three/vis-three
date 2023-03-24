import { DirectionalLight } from "three";
import { getDirectionalLightConfig, } from "./LightConfig";
import { lightCommands, lightCreate } from "./common";
import { defineProcessor } from "@vis-three/middleware";
import { objectDispose } from "@vis-three/module-object";
export default defineProcessor({
    type: "DirectionalLight",
    config: getDirectionalLightConfig,
    commands: lightCommands,
    create(config, engine) {
        return lightCreate(new DirectionalLight(), config, {}, engine);
    },
    dispose: objectDispose,
});
