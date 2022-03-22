import { Engine, ENGINEPLUGIN } from "./Engine";
export class ModelingEngine extends Engine {
    constructor() {
        super();
        this.install(ENGINEPLUGIN.WEBGLRENDERER, {
            antialias: true,
            alpha: true
        })
            .install(ENGINEPLUGIN.SCENE)
            .install(ENGINEPLUGIN.POINTERMANAGER)
            .install(ENGINEPLUGIN.EVENTMANAGER)
            .install(ENGINEPLUGIN.EFFECTCOMPOSER, {
            WebGLMultisampleRenderTarget: true
        })
            .install(ENGINEPLUGIN.SELECTION)
            .install(ENGINEPLUGIN.AXESHELPER)
            .install(ENGINEPLUGIN.GRIDHELPER)
            .install(ENGINEPLUGIN.OBJECTHELPER)
            .install(ENGINEPLUGIN.VIEWPOINT)
            .install(ENGINEPLUGIN.DISPLAYMODE)
            .install(ENGINEPLUGIN.RENDERMANAGER)
            .install(ENGINEPLUGIN.STATS)
            .install(ENGINEPLUGIN.ORBITCONTROLS)
            .install(ENGINEPLUGIN.KEYBOARDMANAGER)
            .install(ENGINEPLUGIN.TRANSFORMCONTROLS)
            .complete();
    }
}
//# sourceMappingURL=ModelingEngine.js.map