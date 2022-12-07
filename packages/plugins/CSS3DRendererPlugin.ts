import {
  CSS3DObject,
  CSS3DRenderer,
} from "three/examples/jsm/renderers/CSS3DRenderer";
import {
  Engine,
  SetCameraEvent,
  SetDomEvent,
  SetSceneEvent,
  SetSizeEvent,
} from "../../src/engine/Engine";
import { Plugin } from "./plugin";

export interface CSS3DRendererParameters {}

export const CSS3DRendererPlugin: Plugin<CSS3DRendererParameters> = function (
  this: Engine,
  params: CSS3DRendererParameters = {}
): boolean {
  if (this.css3DRenderer) {
    console.warn("this has installed css3DRenderer plugin.");
    return false;
  }

  this.css3DRenderer = new CSS3DRenderer();
  const domElement = this.css3DRenderer.domElement;

  domElement.classList.add("vis-css3D");
  domElement.style.position = "absolute";
  domElement.style.top = "0";
  domElement.style.left = "0";
  // domElement.style.width = "0";
  // domElement.style.height = "0";

  this.addEventListener<SetDomEvent>("setDom", (event) => {
    event.dom.appendChild(this.css3DRenderer!.domElement);
  });

  this.addEventListener<SetSizeEvent>("setSize", (event) => {
    this.css3DRenderer!.setSize(event.width, event.height);
  });

  this.addEventListener<SetSceneEvent>("setScene", (event) => {
    const oldScene = event.oldScene;
    oldScene.traverse((object) => {
      if (object instanceof CSS3DObject) {
        object.element.style.display = "none";
      }
    });
  });
  if (this.renderManager) {
    this.renderManager.addEventListener("render", (event) => {
      this.css3DRenderer!.render(this.scene!, this.camera!);
    });
  } else {
    const render = this.render!.bind(this);
    this.render = function (): Engine {
      render();
      this.css3DRenderer!.render(this.scene!, this.camera!);
      return this;
    };
  }

  return true;
};
