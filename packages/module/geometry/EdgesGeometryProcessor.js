import { BoxBufferGeometry, BufferGeometry, EdgesGeometry } from "three";
import { commands, create } from "./common";
import { getEdgesGeometryConfig } from "./GeometryConfig";
import { defineProcessor, } from "@vis-three/middleware";
export default defineProcessor({
    type: "EdgesGeometry",
    config: getEdgesGeometryConfig,
    commands: commands,
    create(config, engine) {
        const geometry = engine.compilerManager.getObjectBySymbol(config.url);
        if (!geometry || !(geometry instanceof BufferGeometry)) {
            console.error(`engine rescoure can not found url: ${config.url}`);
            return new EdgesGeometry(new BoxBufferGeometry(5, 5, 5));
        }
        return create(new EdgesGeometry(geometry), config);
    },
    dispose(target) {
        target.dispose();
    },
});
