import { syncObject } from "@vis-three/utils";
import { CanvasTexture } from "three";
import { needUpdateRegCommand, urlHanlder } from "./common";
import { defineProcessor, MODULETYPE, } from "@vis-three/middleware";
import { getCanvasTextureConfig } from "../TextureConfig";
export default defineProcessor({
    type: "CanvasTexture",
    config: getCanvasTextureConfig,
    commands: {
        set: {
            url: urlHanlder,
            $reg: [needUpdateRegCommand],
        },
    },
    create(config, engine) {
        const texture = new CanvasTexture(engine.compilerManager
            .getCompiler(MODULETYPE.TEXTURE)
            .getResource(config.url, HTMLCanvasElement));
        urlHanlder({ target: texture, value: config.url, engine });
        syncObject(config, texture, {
            type: true,
            url: true,
        });
        texture.needsUpdate = true;
        return texture;
    },
    dispose(target) {
        target.dispose();
    },
});
