import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";
import { Engine, SetDomEvent, SetSizeEvent } from "../engine/Engine";
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

  if (this.renderManager) {
    this.renderManager.removeEventListener("render", this.render!);
    this.renderManager.addEventListener("render", (event) => {
      this.css3DRenderer!.render(this.scene!, this.camera!);
    });
  } else {
    if (this.webGLRenderer) {
      const render = this.render!.bind(this);
      this.render = function (): Engine {
        render();
        this.webGLRenderer!.render(this.scene!, this.camera!);
        return this;
      };
    } else {
      this.render = function (): Engine {
        this.webGLRenderer!.render(this.scene!, this.camera!);
        return this;
      };
    }
  }
  return true;
};
