import {
  CSS2DObject,
  CSS2DRenderer,
} from "three/examples/jsm/renderers/CSS2DRenderer";
import {
  Engine,
  SetDomEvent,
  SetSceneEvent,
  SetSizeEvent,
} from "../../engine/Engine";
import { Plugin } from "../../core/src/core/Plugin";

export interface CSS2DRendererParameters {}

export const CSS2DRendererPlugin: Plugin<CSS2DRendererParameters> = function (
  this: Engine,
  params: CSS2DRendererParameters = {}
): boolean {
  if (this.css2DRenderer) {
    console.warn("this has installed css2DRenderer plugin.");
    return false;
  }

  this.css2DRenderer = new CSS2DRenderer();

  const domElement = this.css2DRenderer.domElement;

  domElement.classList.add("vis-css2D");
  domElement.style.position = "absolute";
  domElement.style.top = "0";
  domElement.style.left = "0";

  this.addEventListener<SetDomEvent>("setDom", (event) => {
    event.dom.appendChild(this.css2DRenderer!.domElement);
  });

  this.addEventListener<SetSizeEvent>("setSize", (event) => {
    this.css2DRenderer!.setSize(event.width, event.height);
  });

  this.addEventListener<SetSceneEvent>("setScene", (event) => {
    const oldScene = event.oldScene;
    oldScene.traverse((object) => {
      if (object instanceof CSS2DObject) {
        object.element.style.display = "none";
      }
    });
  });

  if (this.renderManager) {
    this.renderManager.addEventListener("render", (event) => {
      this.css2DRenderer!.render(this.scene!, this.camera!);
    });
  } else {
    const render = this.render!.bind(this);
    this.render = function (): Engine {
      render();
      this.css2DRenderer!.render(this.scene!, this.camera!);
      return this;
    };
  }
  return true;
};
