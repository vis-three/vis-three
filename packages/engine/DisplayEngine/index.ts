import { Camera, Scene, WebGLRenderer } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { EventManager } from "../manager/EventManager";
import { PointerManager } from "../manager/PointerManager";
import { RenderManager } from "../manager/RenderManager";
import { VisOrbitControls } from "../optimize/VisOrbitControls";
import { Engine } from "@vis-three/core";
export class DisplayEngine extends Engine {
  declare dom: HTMLElement;
  declare webGLRenderer: WebGLRenderer;
  declare currentCamera: Camera;
  declare scene: Scene;
  declare orbitControls: VisOrbitControls;
  declare effectComposer: EffectComposer;
  declare renderManager: RenderManager;
  declare pointerManager: PointerManager;
  declare eventManager: EventManager;

  declare play: () => this;
  declare stop: () => this;
  declare render: () => this;

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
