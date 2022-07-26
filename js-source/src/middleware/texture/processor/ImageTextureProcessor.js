import { defineProcessor } from "../../../core/Processor";
import { ImageTexture } from "../../../extends/texture/ImageTexture";
import { syncObject } from "../../../utils/utils";
import { CONFIGTYPE } from "../../constants/configType";
import { getResource, needUpdateRegCommand } from "./common";
export default defineProcessor({
    configType: CONFIGTYPE.IMAGETEXTURE,
    commands: {
        set: {
            url({ target, value, engine }) {
                target.image = getResource(value, engine, HTMLImageElement);
                target.needsUpdate = true;
            },
            $reg: [needUpdateRegCommand],
        },
    },
    create(config, engine) {
        const texture = new ImageTexture();
        if (config.url) {
            texture.image = getResource(config.url, engine, HTMLImageElement);
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
//# sourceMappingURL=ImageTextureProcessor.js.map