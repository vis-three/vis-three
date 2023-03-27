import { Points } from "three";
import { defineProcessor } from "../module";
import { solidObjectCommands, solidObjectCreate, solidObjectDispose, } from "../solidObject/SolidObjectProcessor";
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
