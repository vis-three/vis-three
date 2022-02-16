import { EnginePlugin } from "../../engine/Engine";
import { EngineSupport } from "./EngineSupport";
export class ModelingEngineSupport extends EngineSupport {
    constructor(parameters) {
        super(parameters);
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
            .install(EnginePlugin.TRANSFORMCONTROLS)
            .support();
    }
}
//# sourceMappingURL=ModelingEngineSupport.js.map