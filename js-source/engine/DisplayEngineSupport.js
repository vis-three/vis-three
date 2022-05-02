import { ENGINEPLUGIN } from "./Engine";
import { EngineSupport } from "./EngineSupport";
export class DisplayEngineSupport extends EngineSupport {
    constructor(parameters) {
        super(parameters);
        this.install(ENGINEPLUGIN.WEBGLRENDERER, {
            antialias: true,
            alpha: true,
        })
            .install(ENGINEPLUGIN.EFFECTCOMPOSER, {
            WebGLMultisampleRenderTarget: true,
        })
            .install(ENGINEPLUGIN.ORBITCONTROLS)
            .complete();
    }
}
//# sourceMappingURL=DisplayEngineSupport.js.map