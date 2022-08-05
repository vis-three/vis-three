import { CanvasTexture } from "three";
import { defineProcessor } from "../../../core/Processor";
import { syncObject } from "../../../utils/utils";
import { CONFIGTYPE } from "../../constants/configType";
import { needUpdateRegCommand } from "./common";
export default defineProcessor({
    configType: CONFIGTYPE.CANVASTEXTURE,
    commands: {
        set: {
            url({ target, value, engine }) {
                target.image = engine.compilerManager.textureCompiler.getResource(value, HTMLCanvasElement);
                target.needsUpdate = true;
            },
            $reg: [needUpdateRegCommand],
        },
    },
    create(config, engine) {
        const texture = new CanvasTexture(engine.compilerManager.textureCompiler.getResource(config.url, HTMLCanvasElement));
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