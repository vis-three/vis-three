import { EngineSupport, ModuleOptions } from "@vis-three/tdcm";
import {
  Screenshot,
  WebGLRendererEngine,
  WebGLRendererPlugin,
} from "@vis-three/plugin-webgl-renderer";
import {
  CSS2DRendererEngine,
  CSS2DRendererPlugin,
} from "@vis-three/plugin-css2d-renderer";
import {
  CSS3DRendererEngine,
  CSS3DRendererPlugin,
} from "@vis-three/plugin-css3d-renderer";
import {
  EffectComposerEngine,
  EffectComposerPlugin,
} from "@vis-three/plugin-effect-composer";
import {
  OrbitControlsEngine,
  OrbitControlsPlugin,
  VisOrbitControls,
} from "@vis-three/plugin-orbit-controls";
import { CameraAdaptivePlugin } from "@vis-three/plugin-camera-adaptive";

import { WebGLRenderer } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import { CSS3DRendererSupportStrategy } from "@vis-three/strategy-css3d-renderer-support";
import { WebGLRendererSupportStrategy } from "@vis-three/strategy-webgl-renderer-support";
import { OrbitControlsSupportStrategy } from "@vis-three/strategy-orbit-controls-support";

import { CSS2DRenderStrategy } from "@vis-three/strategy-css2d-render";
import { CSS3DRenderStrategy } from "@vis-three/strategy-css3d-render";
import { EffectRenderStrategy } from "@vis-three/strategy-effect-render";
import { OrbitRenderStrategy } from "@vis-three/strategy-orbit-render";
import { ComposerSupportStrategy } from "@vis-three/strategy-composer-support";

import { modules } from "@vis-three/library-module";
import * as parserLibrary from "@vis-three/library-parser";
import { MultiRendererEventStrategy } from "@vis-three/strategy-multi-renderer";
import { SceneEngineSupport } from "@vis-three/library-module/scene";
import { CameraEngineSupport } from "@vis-three/library-module/camera";

export class DisplayEngineSupport
  extends EngineSupport
  implements
    WebGLRendererEngine,
    EffectComposerEngine,
    OrbitControlsEngine,
    CSS2DRendererEngine,
    CSS3DRendererEngine,
    SceneEngineSupport,
    CameraEngineSupport
{
  declare webGLRenderer: WebGLRenderer;
  declare effectComposer: EffectComposer;
  declare orbitControls: VisOrbitControls;
  declare css2DRenderer: CSS2DRenderer;
  declare css3DRenderer: CSS3DRenderer;

  declare getScreenshot: (params?: Screenshot | undefined) => Promise<string>;
  declare setSceneBySymbol: (scene: string) => this;
  declare setCameraBySymbol: (camera: string) => this;
  constructor() {
    super();

    for (const parser of Object.values(parserLibrary)) {
      this.resourceManager.addParser(new parser());
    }

    this.install(
      WebGLRendererPlugin({
        antialias: true,
        alpha: true,
      })
    )
      .install(CSS2DRendererPlugin())
      .install(CSS3DRendererPlugin())
      .install(
        EffectComposerPlugin({
          MSAA: true,
        })
      )
      .install(OrbitControlsPlugin())
      .install(CameraAdaptivePlugin());

    for (const module of modules) {
      this.useModule(module);
    }

    this.exec(CSS2DRenderStrategy())
      .exec(CSS3DRenderStrategy())
      .exec(EffectRenderStrategy())
      .exec(OrbitRenderStrategy())
      .exec(CSS3DRendererSupportStrategy())
      .exec(WebGLRendererSupportStrategy())
      .exec(OrbitControlsSupportStrategy())
      .exec(ComposerSupportStrategy())
      .exec(MultiRendererEventStrategy());
  }
}
