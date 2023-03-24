import { defineProcessor } from "@vis-three/middleware";
import { solidObjectCommands, solidObjectCreate, solidObjectDispose, } from "@vis-three/module-solid-object";
import { Line } from "three";
import { getLineConfig } from "./LineConfig";
export default defineProcessor({
    type: "Line",
    config: getLineConfig,
    commands: solidObjectCommands,
    create(config, engine) {
        return solidObjectCreate(new Line(), config, {}, engine);
    },
    dispose: solidObjectDispose,
});
