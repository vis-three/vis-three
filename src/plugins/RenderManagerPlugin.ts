import { Engine } from "../engine/Engine";
import { RenderManager } from "../manager/RenderManager";
import { Plugin } from "./plugin";

export const RenderManagerPlugin: Plugin<Object> = function (
  this: Engine
): boolean {
  if (this.renderManager) {
    console.warn("has installed render manager plugin.");
    return false;
  }

  this.renderManager = new RenderManager();

  this.render && this.renderManager!.addEventListener("render", this.render);

  this.render = function () {
    this.renderManager!.render();
    return this;
  };
  this.play = function () {
    this.renderManager!.play();
    return this;
  };
  this.stop = function () {
    this.renderManager!.stop();
    return this;
  };

  return true;
};
