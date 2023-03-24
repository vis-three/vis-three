import { defineProcessor } from "@vis-three/middleware";
import { solidObjectCommands, solidObjectCreate, solidObjectDispose, } from "@vis-three/module-solid-object";
import { Mesh } from "three";
import { getMeshConfig } from "./MeshConfig";
export default defineProcessor({
    type: "Mesh",
    config: getMeshConfig,
    commands: solidObjectCommands,
    create(config, engine) {
        return solidObjectCreate(new Mesh(), config, {}, engine);
    },
    dispose: solidObjectDispose,
});
