import { LoadGeometry } from "@vis-three/core";
import { BoxBufferGeometry, BufferGeometry } from "three";
import { commands, create } from "./common";
import { getLoadGeometryConfig } from "./GeometryConfig";
import { defineProcessor, } from "@vis-three/middleware";
export default defineProcessor({
    type: "LoadGeometry",
    config: getLoadGeometryConfig,
    commands: commands,
    create(config, engine) {
        const originGeometry = engine.resourceManager.resourceMap.get(config.url);
        if (!originGeometry && !(originGeometry instanceof BufferGeometry)) {
            console.error(`engine rescoure can not found url: ${config.url}`);
            return new BoxBufferGeometry(5, 5, 5);
        }
        return create(new LoadGeometry(originGeometry), config);
    },
    dispose(target) {
        target.dispose();
    },
});
