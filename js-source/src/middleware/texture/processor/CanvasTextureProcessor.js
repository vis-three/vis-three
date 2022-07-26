import { CanvasTexture } from "three";
import { defineProcessor } from "../../../core/Processor";
import { syncObject } from "../../../utils/utils";
import { CONFIGTYPE } from "../../constants/configType";
import { getResource, replaceImage } from "./common";
export default defineProcessor({
    configType: CONFIGTYPE.CANVASTEXTURE,
    commands: {
        set: {
            url({ target, value, engine }) {
                target.image = getResource(value, engine, HTMLCanvasElement);
                target.needsUpdate = true;
            },
        },
    },
    create(config, engine) {
        const texture = new CanvasTexture(replaceImage);
        if (config.url) {
            texture.image = getResource(config.url, engine, HTMLCanvasElement);
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
//# sourceMappingURL=CanvasTextureProcessor.js.map