import { Engine, EnginePlugin } from "./Engine";
export class ModelingEngine extends Engine {
    constructor() {
        super();
        this.install(EnginePlugin.WEBGLRENDERER, {
            antialias: true,
            alpha: true
        })
            .install(EnginePlugin.MODELINGSCENE, {
            hasDefaultPerspectiveCamera: true,
            hasDefaultOrthographicCamera: true,
            hasAxesHelper: true,
            hasGridHelper: true,
            hasDisplayMode: true,
            displayMode: 'env'
        })
            .install(EnginePlugin.RENDERMANAGER)
            .install(EnginePlugin.STATS)
            .install(EnginePlugin.EFFECTCOMPOSER, {
            WebGLMultisampleRenderTarget: true
        })
            .install(EnginePlugin.ORBITCONTROLS)
            .install(EnginePlugin.POINTERMANAGER)
            .install(EnginePlugin.EVENTMANAGER)
            .install(EnginePlugin.TRANSFORMCONTROLS);
    }
}
//# sourceMappingURL=ModelingEngine.js.map