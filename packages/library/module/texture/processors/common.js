import { globalAntiShake, MODULETYPE, } from "@vis-three/middleware";
import { TextureCompiler } from "../TextureCompiler";
export const needUpdateRegCommand = {
    reg: new RegExp("wrapS|wrapT|format|encoding|anisotropy|magFilter|minFilter|mapping"),
    handler({ target, key, value, }) {
        target[key] = value;
        target.needsUpdate = true;
    },
};
export const urlHanlder = function ({ target, value, engine, }) {
    globalAntiShake.exec((finish) => {
        target.image = engine.compilerManager
            .getCompiler(MODULETYPE.TEXTURE)
            .getResource(value, [
            HTMLImageElement,
            HTMLVideoElement,
            HTMLCanvasElement,
        ]);
        target.needsUpdate = true;
        if (target.images === TextureCompiler.replaceImage) {
            return false;
        }
        return true;
    });
};
