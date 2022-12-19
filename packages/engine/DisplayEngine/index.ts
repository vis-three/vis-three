import { Camera, Scene, WebGLRenderer } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import {
  Screenshot,
  WebGLRendererEngine,
  WebGLRendererPlugin,
} from "@vis-three/webgl-renderer-plugin";
import {
  CSS2DRendererEngine,
  CSS2DRendererPlugin,
} from "@vis-three/css2d-renderer-plugin";
import {
  CSS3DRendererEngine,
  CSS3DRendererPlugin,
} from "@vis-three/css3d-renderer-plugin";
import {
  EffectComposerEngine,
  EffectComposerPlugin,
} from "@vis-three/effect-composer-plugin";
import {
  OrbitControlsEngine,
  OrbitControlsPlugin,
} from "@vis-three/orbit-controls-plugin";
import { CameraAdaptivePlugin } from "@vis-three/camera-adaptive-plugin";
import {
  RenderManager,
  RenderManagerEngine,
  RenderManagerPlugin,
} from "@vis-three/render-manager-plugin";
import {
  PointerManager,
  PointerManagerEngine,
  PointerManagerPlugin,
} from "@vis-three/pointer-manager-plugin";
import {
  EventManager,
  EventManagerEngine,
  EventManagerPlugin,
} from "@vis-three/event-manager-plugin";
import { CSS2DRenderStrategy } from "@vis-three/css2d-render-strategy";
import { CSS3DRenderStrategy } from "@vis-three/css3d-render-strategy";
import { EffectRenderStrategy } from "@vis-three/effect-render-strategy";
import { OrbitRenderStrategy } from "@vis-three/orbit-render-strategy";

import { Engine, VisOrbitControls } from "@vis-three/core";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer";
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
