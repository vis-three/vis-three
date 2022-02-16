import { Engine, EnginePlugin } from "./Engine";
export class DisplayEngine extends Engine {
    constructor() {
        super();
        this.install(EnginePlugin.WEBGLRENDERER, {
            antialias: true,
            alpha: true
        });
        this.install(EnginePlugin.SCENE);
        this.install(EnginePlugin.RENDERMANAGER);
        this.install(EnginePlugin.EFFECTCOMPOSER, {
            WebGLMultisampleRenderTarget: true
        });
        this.install(EnginePlugin.ORBITCONTROLS);
        this.install(EnginePlugin.POINTERMANAGER);
        this.install(EnginePlugin.EVENTMANAGER);
    }
}
//# sourceMappingURL=DisplayEngine.js.map