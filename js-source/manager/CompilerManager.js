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
}
//# sourceMappingURL=CompilerManager.js.map