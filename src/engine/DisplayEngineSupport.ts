import { Camera, Scene, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { EventManager } from "../manager/EventManager";
import { PointerManager } from "../manager/PointerManager";
import { RenderManager } from "../manager/RenderManager";
import { ENGINEPLUGIN } from "./Engine";
import { EngineSupport, EngineSupportParameters } from "./EngineSupport";

export class DisplayEngineSupport extends EngineSupport {
  declare dom: HTMLElement;
  declare webGLRenderer: WebGLRenderer;
  declare currentCamera: Camera;
  declare scene: Scene;
  declare orbitControls: OrbitControls;
  declare effectComposer: EffectComposer;
  declare renderManager: RenderManager;
  declare pointerManager: PointerManager;
  declare eventManager: EventManager;
  declare transing: boolean;

  declare setSize: (width: number, height: number) => this;
  declare setCamera: (camera: Camera) => this;
  declare setDom: (dom: HTMLElement) => this;

  declare play: () => this;
  declare stop: () => this;
  declare render: () => this;

  constructor(parameters?: EngineSupportParameters) {
    super();
    this.install(ENGINEPLUGIN.WEBGLRENDERER, {
      antialias: true,
      alpha: true,
    });
    this.install(ENGINEPLUGIN.SCENE);
    this.install(ENGINEPLUGIN.RENDERMANAGER);
    this.install(ENGINEPLUGIN.EFFECTCOMPOSER, {
      WebGLMultisampleRenderTarget: true,
    });
    this.install(ENGINEPLUGIN.ORBITCONTROLS);
    this.install(ENGINEPLUGIN.POINTERMANAGER);
    this.install(ENGINEPLUGIN.EVENTMANAGER).complete();
  }
}
