import { ENGINEPLUGIN } from "./Engine";
import { EngineSupport } from "./EngineSupport";
export class ModelingEngineSupport extends EngineSupport {
    IS_ENGINESUPPORT = true;
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
            .complete();
    }
}
//# sourceMappingURL=ModelingEngineSupport.js.map