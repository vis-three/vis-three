import { ENGINEPLUGIN } from "../../engine/Engine";
import { EngineSupport } from "./EngineSupport";
export class ModelingEngineSupport extends EngineSupport {
    constructor(parameters) {
        super(parameters);
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
            .install(ENGINEPLUGIN.TRANSFORMCONTROLS)
            .support();
    }
}
//# sourceMappingURL=ModelingEngineSupport.js.map