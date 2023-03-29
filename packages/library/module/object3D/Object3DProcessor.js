import { defineProcessor } from "@vis-three/middleware";
import { objectCommands, objectCreate, objectDispose, } from "@vis-three/module-object";
import { Object3D } from "three";
import { getObject3DConfig } from "./Object3DConfig";
export default defineProcessor({
    type: "Object3D",
    config: getObject3DConfig,
    commands: objectCommands,
    create(config, engine) {
        return objectCreate(new Object3D(), config, {}, engine);
    },
    dispose: objectDispose,
});
