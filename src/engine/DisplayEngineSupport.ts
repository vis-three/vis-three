import { Camera, Scene, WebGLRenderer } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { EventManager } from "../manager/EventManager";
import { PointerManager } from "../manager/PointerManager";
import { RenderManager } from "../manager/RenderManager";
import { VisOrbitControls } from "../optimize/VisOrbitControls";
import { ENGINEPLUGIN } from "./Engine";
import { EngineSupport, EngineSupportParameters } from "./EngineSupport";

export class DisplayEngineSupport extends EngineSupport {
  declare dom: HTMLElement;
  declare webGLRenderer: WebGLRenderer;
  declare camera: Camera;
  declare scene: Scene;
  declare orbitControls: VisOrbitControls;
  declare effectComposer: EffectComposer;
  declare renderManager: RenderManager;
  declare pointerManager: PointerManager;
  declare eventManager: EventManager;

  declare play: () => this;
  declare stop: () => this;
  declare render: () => this;

  constructor(parameters?: EngineSupportParameters) {
    super();
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
