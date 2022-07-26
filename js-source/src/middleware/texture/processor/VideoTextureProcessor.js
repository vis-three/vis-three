import { defineProcessor } from "../../../core/Processor";
import { VideoTexture } from "../../../optimize/VideoTexture";
import { syncObject } from "../../../utils/utils";
import { CONFIGTYPE } from "../../constants/configType";
import { getResource } from "./common";
export default defineProcessor({
    configType: CONFIGTYPE.VIDEOTEXTURE,
    commands: {
        set: {
            url({ target, value, engine }) {
                target.image = getResource(value, engine, HTMLVideoElement);
                target.needsUpdate = true;
            },
        },
    },
    create(config, engine) {
        const texture = new VideoTexture(document.createElement("video"));
        if (config.url) {
            texture.image = getResource(config.url, engine, HTMLVideoElement);
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
//# sourceMappingURL=VideoTextureProcessor.js.map