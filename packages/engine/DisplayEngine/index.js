import { Engine } from "@vis-three/core";
export class DisplayEngine extends Engine {
    constructor() {
        super();
        this.install(ENGINEPLUGIN.WEBGLRENDERER, {
            antialias: true,
            alpha: true,
        })
            .install(ENGINEPLUGIN.RENDERMANAGER)
            .install(ENGINEPLUGIN.EFFECTCOMPOSER, {
            WebGLMultisampleRenderTarget: true,
        })
            .install(ENGINEPLUGIN.ORBITCONTROLS)
            .install(ENGINEPLUGIN.POINTERMANAGER)
            .install(ENGINEPLUGIN.EVENTMANAGER)
            .complete();
    }
}
