import {
  Engine,
  ENGINE_EVENT,
  Plugin,
  SetDomEvent,
  SetSceneEvent,
  SetSizeEvent
} from "@vis-three/core";
import { RenderEvent, RenderManagerEngine, RENDER_EVENT } from "@vis-three/render-manager-plugin";
import {
  CSS2DObject,
  CSS2DRenderer,
} from "three/examples/jsm/renderers/CSS2DRenderer";

export interface CSS2DRendererEngine extends Engine {
  css2DRenderer: CSS2DRenderer;
}

export interface CSS2DAndRenderEngine
  extends CSS2DRendererEngine,
    RenderManagerEngine {}

export const CSS2DRendererPlugin: Plugin<CSS2DRendererEngine> = function () {
  let setDomFun: (event: SetDomEvent) => void;
  let setSizeFun: (event: SetSizeEvent) => void;
  let setSceneFun: (event: SetSceneEvent) => void;
  let renderFun: (event: RenderEvent) => void;
  let cacheRender: () => void;

  return {
    name: "CSS2DRendererPlugin",
    install(engine) {
      const css2DRenderer = new CSS2DRenderer();

      engine.css2DRenderer = css2DRenderer;

      const domElement = css2DRenderer.domElement;

      domElement.classList.add("vis-css2D");
      domElement.style.position = "absolute";
      domElement.style.top = "0";
      domElement.style.left = "0";

      setDomFun = (event) => {
        event.dom.appendChild(css2DRenderer.domElement);
      };

      setSizeFun = (event) => {
        css2DRenderer.setSize(event.width, event.height);
      };

      setSceneFun = (event) => {
        const oldScene = event.oldScene;
        oldScene.traverse((object) => {
          if (object instanceof CSS2DObject) {
            object.element.style.display = "none";
          }
        });
      };

      engine.addEventListener<SetDomEvent>(ENGINE_EVENT.SETDOM, setDomFun);

      engine.addEventListener<SetSizeEvent>(ENGINE_EVENT.SETSIZE, setSizeFun);

      engine.addEventListener<SetSceneEvent>(
        ENGINE_EVENT.SETSCENE,
        setSceneFun
      );

      cacheRender = engine.render.bind(engine);

      engine.render = function (): Engine {
        cacheRender();
        this.css2DRenderer.render(this.scene, this.camera);
        return this;
      };
    },
    dispose(engine) {
      engine.render = cacheRender;

      engine.removeEventListener<SetDomEvent>(ENGINE_EVENT.SETDOM, setDomFun);

      engine.removeEventListener<SetSizeEvent>(
        ENGINE_EVENT.SETSIZE,
        setSizeFun
      );

      engine.removeEventListener<SetSceneEvent>(
        ENGINE_EVENT.SETSCENE,
        setSceneFun
      );
    },
    installDeps: {
      RendererManagerPlugin(engine: CSS2DAndRenderEngine) {
        renderFun = (event: RenderEvent) => {
          engine.css2DRenderer.render(engine.scene, engine.camera);
        };
        engine.renderManager.addEventListener<RenderEvent>(
          RENDER_EVENT.RENDER,
          renderFun
        );
      },
    },
    disposeDeps: {
      RendererManagerPlugin(engine: CSS2DAndRenderEngine) {
        engine.renderManager.removeEventListener(
          RENDER_EVENT.RENDER,
          renderFun
        );
      },
    },
  };
};
