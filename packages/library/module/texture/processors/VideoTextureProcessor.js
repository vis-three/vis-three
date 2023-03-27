import { getVideoTextureConfig } from "../TextureConfig";
import { needUpdateRegCommand, urlHanlder } from "./common";
import { VideoTexture } from "@vis-three/core";
import { syncObject } from "@vis-three/utils";
import { defineProcessor } from "@vis-three/middleware";
export default defineProcessor({
    type: "VideoTexture",
    config: getVideoTextureConfig,
    commands: {
        set: {
            url: urlHanlder,
            $reg: [needUpdateRegCommand],
        },
    },
    create(config, engine) {
        const texture = new VideoTexture(document.createElement("video"));
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
