import { WebGLRenderer } from "three";
import { Compiler, CompilerTarget } from "../../core/Compiler";
import { RendererAllType } from "./RendererConfig";
import { CONFIGTYPE } from "../constants/configType";
import { EngineSupport } from "../../main";
import { MODULETYPE } from "../constants/MODULETYPE";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";
import WebGLRendererProcessor from "./processor/WebGLRendererProcessor";
import CSS3DRendererProcessor from "./processor/CSS3DRendererProcessor";

export interface RendererCompilerTarget
  extends CompilerTarget<RendererAllType> {}

export class RendererCompiler extends Compiler<
  RendererAllType,
  RendererCompilerTarget,
  WebGLRenderer | CSS3DRenderer
> {
  MODULE: MODULETYPE = MODULETYPE.RENDERER;

  constructor() {
    super();
  }

  useEngine(engine: EngineSupport): this {
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
