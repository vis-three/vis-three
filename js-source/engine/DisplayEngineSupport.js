import { ENGINEPLUGIN } from "./Engine";
import { EngineSupport } from "./EngineSupport";
export class DisplayEngineSupport extends EngineSupport {
    constructor(parameters) {
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
        this.install(ENGINEPLUGIN.EVENTMANAGER)
            .complete();
    }
}
//# sourceMappingURL=DisplayEngineSupport.js.map