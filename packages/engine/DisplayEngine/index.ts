import { Camera, Scene, WebGLRenderer } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { WebGLRendererPlugin } from "@vis-three/webgl-renderer-plugin";
import { CSS2DRendererPlugin } from "@vis-three/css2d-renderer-plugin";
import { CSS3DRendererPlugin } from "@vis-three/css3d-renderer-plugin";
import { EffectComposerPlugin } from "@vis-three/effect-composer-plugin";
import { OrbitControlsPlugin } from "@vis-three/orbit-controls-plugin";
import { CameraAdaptivePlugin } from "@vis-three/camera-adaptive-plugin";
import {
  RenderManager,
  RenderManagerPlugin,
} from "@vis-three/render-manager-plugin";
import {
  PointerManager,
  PointerManagerPlugin,
} from "@vis-three/pointer-manager-plugin";
import {
  EventManager,
  EventManagerPlugin,
} from "@vis-three/event-manager-plugin";

import { Engine, VisOrbitControls } from "@vis-three/core";
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
    this.install(RenderManagerPlugin())

      .install(PointerManagerPlugin())
      .install(EventManagerPlugin())
      .install(
        WebGLRendererPlugin({
          antialias: true,
          alpha: true,
        })
      )
      .install(CSS2DRendererPlugin())
      .install(CSS3DRendererPlugin())
      .install(
        EffectComposerPlugin({
          WebGLMultisampleRenderTarget: true,
        })
      )
      .install(OrbitControlsPlugin())
      .install(CameraAdaptivePlugin());
  }
}
