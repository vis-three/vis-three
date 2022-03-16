import { Engine, ENGINEPLUGIN } from "./Engine";
export class ModelingEngine extends Engine {
    constructor() {
        super();
        this.install(ENGINEPLUGIN.WEBGLRENDERER, {
            antialias: true,
            alpha: true
        })
            .install(ENGINEPLUGIN.MODELINGSCENE, {
            hasDefaultPerspectiveCamera: true,
            hasDefaultOrthographicCamera: true,
            hasAxesHelper: true,
            hasGridHelper: true,
            hasDisplayMode: true,
            displayMode: 'env'
        })
            .install(ENGINEPLUGIN.RENDERMANAGER)
            .install(ENGINEPLUGIN.STATS)
            .install(ENGINEPLUGIN.EFFECTCOMPOSER, {
            WebGLMultisampleRenderTarget: true
        })
            .install(ENGINEPLUGIN.ORBITCONTROLS)
            .install(ENGINEPLUGIN.POINTERMANAGER)
            .install(ENGINEPLUGIN.EVENTMANAGER)
            .install(ENGINEPLUGIN.KEYBOARDMANAGER)
            .install(ENGINEPLUGIN.TRANSFORMCONTROLS)
            .complete();
    }
}
//# sourceMappingURL=ModelingEngine.js.map