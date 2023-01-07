import {
  Engine,
  ENGINE_EVENT,
  Plugin,
  SetDomEvent,
  SetSceneEvent,
  SetSizeEvent,
} from "@vis-three/core";
import {
  CSS2DObject,
  CSS2DRenderer,
} from "three/examples/jsm/renderers/CSS2DRenderer";

import { transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";

export interface CSS2DRendererEngine extends Engine {
  css2DRenderer: CSS2DRenderer;
}

export const name = transPkgName(pkgname);

export const CSS2DRendererPlugin: Plugin<CSS2DRendererEngine> = function () {
  let setDomFun: (event: SetDomEvent) => void;
  let setSizeFun: (event: SetSizeEvent) => void;
  let setSceneFun: (event: SetSceneEvent) => void;

  let cacheRender: (delta: number) => CSS2DRendererEngine;

  return {
    name,
    install(engine) {
      const css2DRenderer = new CSS2DRenderer();

      engine.css2DRenderer = css2DRenderer;

      const domElement = css2DRenderer.domElement;

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

      engine.addEventListener<SetDomEvent>(ENGINE_EVENT.SETDOM, setDomFun);

      engine.addEventListener<SetSizeEvent>(ENGINE_EVENT.SETSIZE, setSizeFun);

      engine.addEventListener<SetSceneEvent>(
        ENGINE_EVENT.SETSCENE,
        setSceneFun
      );

      cacheRender = engine.render.bind(engine);

      engine.render = function (delta: number) {
        cacheRender(delta);
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

      engine.render = cacheRender;
    },
  };
};
