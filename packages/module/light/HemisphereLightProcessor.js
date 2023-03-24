import { Color, HemisphereLight } from "three";
import { getHemisphereLightConfig } from "./LightConfig";
import { lightCommands, lightCreate } from "./common";
import { defineProcessor } from "@vis-three/middleware";
import { objectDispose } from "@vis-three/module-object";
export default defineProcessor({
    type: "HemisphereLight",
    config: getHemisphereLightConfig,
    commands: {
        set: {
            ...lightCommands.set,
            groundColor: function ({ target, value }) {
                target.groundColor.copy(new Color(value));
            },
        },
    },
    create(config, engine) {
        const light = new HemisphereLight();
        light.groundColor.copy(new Color(config.groundColor));
        return lightCreate(light, config, {
            groundColor: true,
        }, engine);
    },
    dispose: objectDispose,
});
