import { defineProcessor } from "@vis-three/middleware";
import { solidObjectCommands, solidObjectCreate, solidObjectDispose, } from "@vis-three/module-solid-object";
import { Points } from "three";
import { getPointsConfig } from "./PointsConfig";
export default defineProcessor({
    type: "Points",
    config: getPointsConfig,
    commands: solidObjectCommands,
    create(config, engine) {
        return solidObjectCreate(new Points(), config, {}, engine);
    },
    dispose: solidObjectDispose,
});
