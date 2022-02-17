import { validate } from "uuid";
export class CompilerManager {
    cameraCompiler;
    lightCompiler;
    geometryCompiler;
    modelCompiler;
    textureCompiler;
    materialCompiler;
    rendererCompiler;
    sceneCompiler;
    controlsCompiler;
    constructor(parameters) {
        Object.keys(parameters).forEach(key => {
            this[key] = parameters[key];
        });
    }
    getObjectVid(object) {
        const objectCompilerList = [
            this.cameraCompiler,
            this.lightCompiler,
            this.modelCompiler
        ];
        for (let compiler of objectCompilerList) {
            const vid = compiler.getSupportVid(object);
            if (vid) {
                return vid;
            }
        }
        return null;
    }
    getMaterial(vid) {
        if (!validate(vid)) {
            console.warn(`compiler manager vid is illeage: ${vid}`);
            return undefined;
        }
        const materialCompiler = this.materialCompiler;
        return materialCompiler.getMap().get(vid);
    }
    getTexture(vid) {
        if (!validate(vid)) {
            console.warn(`compiler manager vid is illeage: ${vid}`);
            return undefined;
        }
        const textureCompiler = this.textureCompiler;
        return textureCompiler.getMap().get(vid);
    }
}
//# sourceMappingURL=CompilerManager.js.map