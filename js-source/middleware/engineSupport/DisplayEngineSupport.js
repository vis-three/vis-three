import { ENGINEPLUGIN } from "../../engine/Engine";
import { EngineSupport } from "./EngineSupport";
export class DisplayEngineSupport extends EngineSupport {
    constructor(parameters) {
        super(parameters);
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
            .support();
    }
}
//# sourceMappingURL=DisplayEngineSupport.js.map