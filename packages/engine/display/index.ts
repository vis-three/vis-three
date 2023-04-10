import { Camera, Scene, WebGLRenderer } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { Engine } from "@vis-three/core";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer";

import {
  Screenshot,
  WebGLRendererEngine,
  WebGLRendererPlugin,
} from "@vis-three/plugin-webgl-renderer";
import {
  EffectComposerEngine,
  EffectComposerPlugin,
} from "@vis-three/plugin-effect-composer";
import {
  OrbitControlsEngine,
  OrbitControlsPlugin,
  VisOrbitControls,
} from "@vis-three/plugin-orbit-controls";
import {
  RenderManager,
  RenderManagerEngine,
  RenderManagerPlugin,
} from "@vis-three/plugin-render-manager";
import {
  PointerManager,
  PointerManagerEngine,
  PointerManagerPlugin,
} from "@vis-three/plugin-pointer-manager";
import {
  CSS2DRendererEngine,
  CSS2DRendererPlugin,
} from "@vis-three/plugin-css2d-renderer";
import {
  CSS3DRendererEngine,
  CSS3DRendererPlugin,
} from "@vis-three/plugin-css3d-renderer";
import {
  EventManager,
  EventManagerEngine,
  EventManagerPlugin,
} from "@vis-three/plugin-event-manager";
import { CameraAdaptivePlugin } from "@vis-three/plugin-camera-adaptive";
import { CSS2DRenderStrategy } from "@vis-three/strategy-css2d-render";
import { CSS3DRenderStrategy } from "@vis-three/strategy-css3d-render";
import { EffectRenderStrategy } from "@vis-three/strategy-effect-render";
import { OrbitRenderStrategy } from "@vis-three/strategy-orbit-render";
export class DisplayEngine
  extends Engine
  implements
    WebGLRendererEngine,
    EffectComposerEngine,
    OrbitControlsEngine,
    RenderManagerEngine,
    PointerManagerEngine,
    EventManagerEngine,
    CSS2DRendererEngine,
    CSS3DRendererEngine
{
  declare dom: HTMLElement;
  declare webGLRenderer: WebGLRenderer;
  declare currentCamera: Camera;
  declare scene: Scene;
  declare orbitControls: VisOrbitControls;
  declare effectComposer: EffectComposer;
  declare renderManager: RenderManager;
  declare pointerManager: PointerManager;
  declare eventManager: EventManager;
  declare css3DRenderer: CSS3DRenderer;
  declare css2DRenderer: CSS2DRenderer;

  declare play: () => this;
  declare stop: () => this;
  declare render: () => this;

  declare getScreenshot: (params?: Screenshot | undefined) => Promise<string>;

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

    this.exec(CSS2DRenderStrategy())
      .exec(CSS3DRenderStrategy())
      .exec(EffectRenderStrategy())
      .exec(OrbitRenderStrategy());
  }
}
