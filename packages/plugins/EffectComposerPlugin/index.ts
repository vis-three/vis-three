import {
  Engine,
  ENGINE_EVENT,
  Optional,
  Plugin,
  RenderEvent,
  RenderManagerEngine,
  RENDER_EVENT,
  SetCameraEvent,
  SetDomEvent,
  SetSceneEvent,
  SetSizeEvent,
} from "@vis-three/core";
import {
  RGBAFormat,
  Vector2,
  WebGLMultisampleRenderTarget,
  WebGLRenderTarget,
} from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { WebGLRendererEngine } from "@vis-three/webgl-renderer-plugin";
export interface EffectComposerParameters {
  WebGLMultisampleRenderTarget?: boolean;
  samples?: number;
  format?: number;
  MSAA?: boolean;
}

export interface EffectComposerEngine extends WebGLRendererEngine {
  effectComposer: EffectComposer;
}

export interface ComposerRenderEngine
  extends EffectComposerEngine,
    RenderManagerEngine {}

export const EffectComposerPlugin: Plugin<EffectComposerEngine> = function (
  params: EffectComposerParameters
) {
  let setCameraFun: (event: SetCameraEvent) => void;
  let setSizeFun: (event: SetSizeEvent) => void;
  let setSceneFun: (event: SetSceneEvent) => void;
  let renderFun: (event: RenderEvent) => void;
  let cacheRender: () => void;

  return {
    name: "EffectComposerPlugin",
    deps: "WebGLRendererPlugin",
    order: true,
    install(engine) {
      let composer: EffectComposer;

      if (params.WebGLMultisampleRenderTarget || params.MSAA) {
        const renderer = engine.webGLRenderer;
        const pixelRatio = renderer.getPixelRatio();
        const size = renderer.getDrawingBufferSize(new Vector2());

        if (Number(window.__THREE__) > 137) {
          composer = new EffectComposer(
            renderer,
            new WebGLRenderTarget(
              size.width * pixelRatio,
              size.height * pixelRatio,
              {
                format: params.format || RGBAFormat,
                // @ts-ignore
                samples: params.samples || 4,
              }
            )
          );
        } else {
          composer = new EffectComposer(
            renderer,
            new WebGLMultisampleRenderTarget(
              size.width * pixelRatio,
              size.height * pixelRatio,
              {
                format: params.format || RGBAFormat,
              }
            )
          );
        }
      } else {
        composer = new EffectComposer(engine.webGLRenderer);
      }

      engine.effectComposer = composer;

      const renderPass = new RenderPass(engine.scene, engine.camera);
      composer.addPass(renderPass);

      setCameraFun = (event) => {
        renderPass.camera = event.camera;
      };

      engine.addEventListener<SetCameraEvent>(
        ENGINE_EVENT.SETCAMERA,
        setCameraFun
      );

      setSceneFun = (event) => {
        renderPass.scene = event.scene;
      };

      engine.addEventListener<SetSceneEvent>(
        ENGINE_EVENT.SETSCENE,
        setSceneFun
      );

      setSizeFun = (event) => {
        composer.setSize(event.width, event.height);
      };

      engine.addEventListener<SetSizeEvent>(ENGINE_EVENT.SETSIZE, setSizeFun);

      cacheRender = engine.render;

      engine.render = function (): Engine {
        this.effectComposer.render();
        return this;
      };
    },
    dispose(engine: Optional<EffectComposerEngine, "effectComposer">) {
      engine.removeEventListener<SetCameraEvent>(
        ENGINE_EVENT.SETCAMERA,
        setCameraFun
      );

      engine.addEventListener<SetSceneEvent>(
        ENGINE_EVENT.SETSCENE,
        setSceneFun
      );

      engine.addEventListener<SetSizeEvent>(ENGINE_EVENT.SETSIZE, setSizeFun);

      engine.render = cacheRender;

      delete engine.effectComposer;
    },
    installDeps: {
      RenderManagerPlugin(engine: ComposerRenderEngine) {
        engine.renderManager.removeEventListener<RenderEvent>(
          ENGINE_EVENT.SETSIZE,
          cacheRender
        );

        renderFun = (event) => {
          engine.effectComposer.render(event.delta);
        };

        engine.renderManager.addEventListener<RenderEvent>(
          ENGINE_EVENT.SETSIZE,
          renderFun
        );
      },
    },
    disposeDeps: {
      RenderManagerPlugin(engine: ComposerRenderEngine) {
        engine.renderManager.removeEventListener<RenderEvent>(
          ENGINE_EVENT.SETSIZE,
          renderFun
        );
      },
    },
  };
};
