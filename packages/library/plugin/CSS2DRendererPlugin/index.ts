import {
  Engine,
  ENGINE_EVENT,
  Plugin,
  RenderEvent,
  SetDomEvent,
  SetSceneEvent,
  SetSizeEvent,
} from "@vis-three/core";
import {
  CSS2DObject,
  CSS2DRenderer,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";

import { transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";

export interface CSS2DRendererEngine extends Engine {
  css2DRenderer: CSS2DRenderer;
}

export const CSS2D_RENDERER_PLUGIN = transPkgName(pkgname);

export const CSS2DRendererPlugin: Plugin<CSS2DRendererEngine, object> =
  function () {
    let setDomFun: (event: SetDomEvent) => void;
    let setSizeFun: (event: SetSizeEvent) => void;
    let setSceneFun: (event: SetSceneEvent) => void;
    let renderFun: (event: RenderEvent) => void;

    return {
      name: CSS2D_RENDERER_PLUGIN,
      install(engine) {
        const css2DRenderer = new CSS2DRenderer();

        engine.css2DRenderer = css2DRenderer;

        const domElement = css2DRenderer.domElement;

        domElement.id = "vis-css2D";
        domElement.classList.add("vis-css2D");
        domElement.style.position = "absolute";
        domElement.style.top = "0";
        domElement.style.left = "0";
        domElement.style.zIndex = "2";

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

        renderFun = () => {
          css2DRenderer.render(engine.scene, engine.camera);
        };

        engine.addEventListener<SetDomEvent>(ENGINE_EVENT.SETDOM, setDomFun);

        engine.addEventListener<SetSizeEvent>(ENGINE_EVENT.SETSIZE, setSizeFun);

        engine.addEventListener<SetSceneEvent>(
          ENGINE_EVENT.SETSCENE,
          setSceneFun
        );

        engine.addEventListener<RenderEvent>(ENGINE_EVENT.RENDER, renderFun);
      },
      dispose(engine) {
        engine.removeEventListener<SetDomEvent>(ENGINE_EVENT.SETDOM, setDomFun);

        engine.removeEventListener<SetSizeEvent>(
          ENGINE_EVENT.SETSIZE,
          setSizeFun
        );

        engine.removeEventListener<SetSceneEvent>(
          ENGINE_EVENT.SETSCENE,
          setSceneFun
        );

        engine.removeEventListener<RenderEvent>(ENGINE_EVENT.RENDER, renderFun);
      },
    };
  };
