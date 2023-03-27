import { defineProcessor } from "@vis-three/middleware";
import { objectCommands, objectCreate, objectDispose, } from "@vis-three/module-object";
import { Group } from "three";
import { getGroupConfig } from "./GroupConfig";
export default defineProcessor({
    type: "Group",
    config: getGroupConfig,
    commands: objectCommands,
    create(config, engine) {
        return objectCreate(new Group(), config, {}, engine);
    },
    dispose: objectDispose,
});
