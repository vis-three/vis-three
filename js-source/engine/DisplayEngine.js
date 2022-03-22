import { Engine, ENGINEPLUGIN } from "./Engine";
export class DisplayEngine extends Engine {
    constructor() {
        super();
        this.install(ENGINEPLUGIN.WEBGLRENDERER, {
            antialias: true,
            alpha: true
        })
            .install(ENGINEPLUGIN.SCENE)
            .install(ENGINEPLUGIN.RENDERMANAGER)
            .install(ENGINEPLUGIN.EFFECTCOMPOSER, {
            WebGLMultisampleRenderTarget: true
        })
            .install(ENGINEPLUGIN.ORBITCONTROLS)
            .install(ENGINEPLUGIN.POINTERMANAGER)
            .install(ENGINEPLUGIN.EVENTMANAGER)
            .complete();
    }
}
//# sourceMappingURL=DisplayEngine.js.map