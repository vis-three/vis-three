import {
  Engine,
  ENGINE_EVENT,
  Plugin,
  SetDomEvent,
  SetSceneEvent,
  SetSizeEvent,
} from "@vis-three/core";
import {
  CSS3DObject,
  CSS3DRenderer,
} from "three/examples/jsm/renderers/CSS3DRenderer";

import { transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";

export interface CSS3DRendererEngine extends Engine {
  css3DRenderer: CSS3DRenderer;
}

export const CSS3D_RENDERER_PLUGIN = transPkgName(pkgname);

export const CSS3DRendererPlugin: Plugin<CSS3DRendererEngine> = function () {
  let setDomFun: (event: SetDomEvent) => void;
  let setSizeFun: (event: SetSizeEvent) => void;
  let setSceneFun: (event: SetSceneEvent) => void;
  let cacheRender: () => void;
  return {
    name: CSS3D_RENDERER_PLUGIN,
    install(engine) {
      const css3DRenderer = new CSS3DRenderer();

      engine.css3DRenderer = css3DRenderer;

      const domElement = css3DRenderer.domElement;

      domElement.classList.add("vis-css3D");
      domElement.style.position = "absolute";
      domElement.style.top = "0";
      domElement.style.left = "0";
      domElement.style.zIndex = "1";

      setDomFun = (event) => {
        event.dom.appendChild(css3DRenderer.domElement);
      };

      setSizeFun = (event) => {
        css3DRenderer.setSize(event.width, event.height);
      };

      setSceneFun = (event) => {
        const oldScene = event.oldScene;
        oldScene.traverse((object) => {
          if (object instanceof CSS3DObject) {
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
        this.css3DRenderer.render(this.scene, this.camera);
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
  };
};
