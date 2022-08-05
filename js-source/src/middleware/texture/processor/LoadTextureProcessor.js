import { Texture } from "three";
import { defineProcessor } from "../../../core/Processor";
import { LoadTexture } from "../../../extends/texture/LoadTexture";
import { syncObject } from "../../../utils/utils";
import { CONFIGTYPE } from "../../constants/configType";
import { needUpdateRegCommand } from "./common";
export default defineProcessor({
    configType: CONFIGTYPE.LOADTEXTURE,
    commands: {
        set: {
            // 当前的LoadTexture是一次性的
            url({}) { },
            $reg: [needUpdateRegCommand],
        },
    },
    create(config, engine) {
        let texture;
        const resource = engine.compilerManager.textureCompiler.getResource(config.url, Texture);
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
//# sourceMappingURL=LoadTextureProcessor.js.map