import { Texture } from "three";
import { LoadTexture } from "@vis-three/core";
import { getLoadTextureConfig } from "../TextureConfig";
import { needUpdateRegCommand } from "./common";
import { syncObject } from "@vis-three/utils";
import { defineProcessor, MODULETYPE } from "@vis-three/middleware";
export default defineProcessor({
    type: "LoadTexture",
    config: getLoadTextureConfig,
    commands: {
        set: {
            // 当前的LoadTexture是一次性的
            url({}) { },
            $reg: [needUpdateRegCommand],
        },
    },
    create(config, engine) {
        let texture;
        const resource = engine.compilerManager
            .getCompiler(MODULETYPE.TEXTURE)
            .getResource(config.url, Texture);
        if (resource instanceof Texture) {
            texture = new LoadTexture(resource);
        }
        else {
            const tempTexture = new Texture(resource);
            texture = new LoadTexture(tempTexture);
        }
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
