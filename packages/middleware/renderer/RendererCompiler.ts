import { WebGLRenderer } from "three";
import { CONFIGTYPE } from "../constants/configType";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";
import WebGLRendererProcessor from "./processor/WebGLRendererProcessor";
import CSS3DRendererProcessor from "./processor/CSS3DRendererProcessor";
import { RendererConfigAllType } from "./RendererConfig";
import { MODULETYPE } from "../constants";
import { Compiler, EngineSupport } from "@vis-three/core";
import { uniqueSymbol } from "../common";

export type RendererAllType = WebGLRenderer | CSS3DRenderer;

export class RendererCompiler extends Compiler<
  RendererConfigAllType,
  RendererAllType
> {
  MODULE: MODULETYPE = MODULETYPE.RENDERER;

  constructor() {
    super();
  }

  useEngine(engine: EngineSupport): this {
    if (engine.webGLRenderer) {
      this.map.set(
        uniqueSymbol(CONFIGTYPE.WEBGLRENDERER),
        engine.webGLRenderer
      );

      this.weakMap.set(
        engine.webGLRenderer,
        uniqueSymbol(CONFIGTYPE.WEBGLRENDERER)
      );
    }

    if (engine.css3DRenderer) {
      this.map.set(
        uniqueSymbol(CONFIGTYPE.CSS3DRENDERER),
        engine.css3DRenderer
      );

      this.weakMap.set(
        engine.css3DRenderer,
        uniqueSymbol(CONFIGTYPE.CSS3DRENDERER)
      );
    }
    return super.useEngine(engine);
  }
}

Compiler.processor(WebGLRendererProcessor);
Compiler.processor(CSS3DRendererProcessor);
