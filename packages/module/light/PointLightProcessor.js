import { PointLight } from "three";
import { getPointLightConfig } from "./LightConfig";
import { lightCommands, lightCreate } from "./common";
import { defineProcessor } from "@vis-three/middleware";
import { objectDispose } from "@vis-three/module-object";
export default defineProcessor({
    type: "PointLight",
    config: getPointLightConfig,
    commands: lightCommands,
    create(config, engine) {
        return lightCreate(new PointLight(), config, {}, engine);
    },
    dispose: objectDispose,
});
