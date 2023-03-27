import { ImageTexture } from "@vis-three/core";
import { syncObject } from "@vis-three/utils";
import { needUpdateRegCommand, urlHanlder } from "./common";
import { defineProcessor } from "@vis-three/middleware";
import { getImageTextureConfig } from "../TextureConfig";
export default defineProcessor({
    type: "ImageTexture",
    config: getImageTextureConfig,
    commands: {
        set: {
            url: urlHanlder,
            $reg: [needUpdateRegCommand],
        },
    },
    create(config, engine) {
        const texture = new ImageTexture();
        if (config.url) {
            urlHanlder({ target: texture, value: config.url, engine });
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
