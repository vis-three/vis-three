import { AmbientLight } from "three";
import { getAmbientLightConfig } from "./LightConfig";
import { lightCommands, lightCreate } from "./common";
import { defineProcessor } from "@vis-three/middleware";
import { objectDispose } from "@vis-three/module-object";
export default defineProcessor({
    type: "AmbientLight",
    config: getAmbientLightConfig,
    commands: lightCommands,
    create(config, engine) {
        return lightCreate(new AmbientLight(), config, {}, engine);
    },
    dispose: objectDispose,
});
