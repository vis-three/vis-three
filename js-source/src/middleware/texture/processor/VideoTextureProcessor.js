import { defineProcessor } from "../../../core/Processor";
import { VideoTexture } from "../../../optimize/VideoTexture";
import { syncObject } from "../../../utils/utils";
import { CONFIGTYPE } from "../../constants/configType";
import { needUpdateRegCommand } from "./common";
export default defineProcessor({
    configType: CONFIGTYPE.VIDEOTEXTURE,
    commands: {
        set: {
            url({ target, value, engine }) {
                target.image = engine.compilerManager.textureCompiler.getResource(value, HTMLVideoElement);
                target.needsUpdate = true;
            },
            $reg: [needUpdateRegCommand],
        },
    },
    create(config, engine) {
        const texture = new VideoTexture(document.createElement("video"));
        if (config.url) {
            texture.image = engine.compilerManager.textureCompiler.getResource(config.url, HTMLVideoElement);
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