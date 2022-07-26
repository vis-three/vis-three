import { Compiler } from "../../core/Compiler";
import { CONFIGTYPE } from "../constants/configType";
import { MODULETYPE } from "../constants/MODULETYPE";
import WebGLRendererProcessor from "./processor/WebGLRendererProcessor";
import CSS3DRendererProcessor from "./processor/CSS3DRendererProcessor";
export class RendererCompiler extends Compiler {
    MODULE = MODULETYPE.RENDERER;
    constructor() {
        super();
    }
    useEngine(engine) {
        if (engine.webGLRenderer) {
            this.map.set(CONFIGTYPE.WEBGLRENDERER, engine.webGLRenderer);
        }
        if (engine.css3DRenderer) {
            this.map.set(CONFIGTYPE.CSS3DRENDERER, engine.css3DRenderer);
        }
        return super.useEngine(engine);
    }
}
Compiler.processor(WebGLRendererProcessor);
Compiler.processor(CSS3DRendererProcessor);
//# sourceMappingURL=RendererCompiler.js.map