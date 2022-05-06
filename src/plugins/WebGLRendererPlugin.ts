import { WebGLRenderer, WebGLRendererParameters } from "three";
import { Engine, SetDomEvent, SetSizeEvent } from "../engine/Engine";
import { Plugin } from "./plugin";

export interface Screenshot {
  width?: number;
  height?: number;
  mine?: string;
}

export const WebGLRendererPlugin: Plugin<WebGLRendererParameters> = function (
  this: Engine,
  params: WebGLRendererParameters = {}
): boolean {
  if (this.webGLRenderer) {
    console.warn("this has installed webglRenderer plugin.");
    return false;
  }

  this.webGLRenderer = new WebGLRenderer(params);

  // 截图
  this.getScreenshot = function (params: Screenshot = {}) {
    const cacheSize = {
      width: this.dom!.offsetWidth,
      height: this.dom!.offsetHeight,
    };

    !params.width && (params.width = this.dom!.offsetWidth);
    !params.height && (params.height = this.dom!.offsetHeight);
    !params.mine && (params.mine = "image/png");

    let renderFlag = false;
    if (this.renderManager!.hasRendering()) {
      this.renderManager!.stop();
      renderFlag = true;
    }

    this.setSize!(params.width, params.height);
    this.renderManager!.render();
    const DataURI = this.webGLRenderer!.domElement.toDataURL(params.mine);
    this.setSize!(cacheSize.width, cacheSize.height);

    if (renderFlag) {
      this.renderManager!.play();
    }

    return DataURI;
  };

  // 设置渲染的dom
  this.addEventListener<SetDomEvent>("setDom", (event) => {
    event.dom.appendChild(this.webGLRenderer!.domElement);
  });

  this.addEventListener<SetSizeEvent>("setSize", (event) => {
    this.webGLRenderer!.setSize(event.width, event.height, true);
  });

  this.addEventListener("dispose", () => {
    this.webGLRenderer!.dispose();
  });

  if (this.renderManager) {
    this.renderManager.removeEventListener("render", this.render!);
    this.renderManager.addEventListener("render", (event) => {
      this.webGLRenderer!.render(this.scene!, this.camera!);
    });
  } else {
    this.render = function (): Engine {
      this.webGLRenderer!.render(this.scene!, this.camera!);
      return this;
    };
  }
  return true;
};
