import { RectAreaLight } from "three";
import { getRectAreaLightConfig } from "./LightConfig";
import { lightCommands, lightCreate } from "./common";
import { defineProcessor } from "@vis-three/middleware";
import { objectDispose } from "@vis-three/module-object";
export default defineProcessor({
    type: "RectAreaLight",
    config: getRectAreaLightConfig,
    commands: lightCommands,
    create(config, engine) {
        return lightCreate(new RectAreaLight(), config, {}, engine);
    },
    dispose: objectDispose,
});
