import { Engine, ENGINEPLUGIN } from "./Engine";
export class DisplayEngine extends Engine {
    constructor() {
        super();
        this.install(ENGINEPLUGIN.WEBGLRENDERER, {
            antialias: true,
            alpha: true
        });
        this.install(ENGINEPLUGIN.SCENE);
        this.install(ENGINEPLUGIN.RENDERMANAGER);
        this.install(ENGINEPLUGIN.EFFECTCOMPOSER, {
            WebGLMultisampleRenderTarget: true
        });
        this.install(ENGINEPLUGIN.ORBITCONTROLS);
        this.install(ENGINEPLUGIN.POINTERMANAGER);
        this.install(ENGINEPLUGIN.EVENTMANAGER);
    }
}
//# sourceMappingURL=DisplayEngine.js.map