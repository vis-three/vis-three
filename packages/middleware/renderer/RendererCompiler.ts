import { WebGLRenderer } from "three";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";
import { RendererConfigAllType } from "./RendererConfig";
import { MODULETYPE } from "../constants";
import { Compiler } from "../module";

export type RendererAllType = WebGLRenderer | CSS3DRenderer;

export class RendererCompiler extends Compiler<
  RendererConfigAllType,
  RendererAllType
> {
  MODULE: MODULETYPE = MODULETYPE.RENDERER;

  constructor() {
    super();
  }
}
