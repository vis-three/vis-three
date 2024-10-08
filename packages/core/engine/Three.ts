import {
  Camera,
  PerspectiveCamera,
  Scene,
  AmbientLight,
  HemisphereLight,
  OrthographicCamera,
  RectAreaLight,
} from "three";
import { LightShadow } from "three/src/lights/LightShadow.js";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";

import { BaseEvent } from "../eventDispatcher";
import { PluginOptions } from "../plugin";
import { StrategyOptions } from "../strategy";
import { Base } from "../base";

export interface SetDomEvent extends BaseEvent {
  type: "setDom";
  dom: HTMLElement;
}

export interface SetCameraOptions {
  orbitControls?: boolean;
  transformControls?: boolean;
}

export interface SetCameraEvent extends BaseEvent {
  type: "setCamera";
  camera: Camera;
  oldCamera: Camera;
  options: SetCameraOptions;
}

export interface SetSceneEvent extends BaseEvent {
  type: "setScene";
  scene: Scene;
  oldScene: Scene;
}

export interface SetSizeEvent extends BaseEvent {
  type: "setSize";
  width: number;
  height: number;
}

export interface RenderEvent extends BaseEvent {
  type: "render";
  delta: number;
}

export enum ENGINE_EVENT {
  SETDOM = "setDom",
  SETSIZE = "setSize",
  SETCAMERA = "setCamera",
  SETSCENE = "setScene",
  RENDER = "render",
  DISPOSE = "dispose",
}

// 引擎槽
export class Engine extends Base {
  static initFlag = false;
  static init() {
    // 增加无用shadow，不然WebGLShadowMap会一直warning

    const lightShadow = new LightShadow(
      new OrthographicCamera(-256, 256, 256, -256)
    );
    lightShadow.autoUpdate = false;
    lightShadow.needsUpdate = false;

    AmbientLight.prototype.shadow = lightShadow as unknown as undefined;
    RectAreaLight.prototype.shadow = lightShadow as unknown as undefined;
    HemisphereLight.prototype.shadow = lightShadow as unknown as undefined;

    RectAreaLightUniformsLib.init();
    Engine.initFlag = true;
  }

  dom: HTMLElement = document.createElement("div");
  camera: Camera = new PerspectiveCamera();
  scene: Scene = new Scene();

  constructor() {
    super();

    if (!Engine.initFlag) {
      Engine.init();
    }

    this.camera.position.set(50, 50, 50);
    this.camera.lookAt(0, 0, 0);
  }

  /**
   * 设置输出的dom，调用时会发布'setDom'事件
   * @param dom 挂载的dom对象
   * @returns this
   */
  setDom(dom: HTMLElement): this {
    this.dom = dom;
    this.dispatchEvent({
      type: ENGINE_EVENT.SETDOM,
      dom: dom,
    });
    return this;
  }

  /**
   * 设置渲染窗口的整体尺寸，单位为px，调用时会发布'setSize'事件。
   * 不传时会自动获取当前挂载dom对象的宽高。
   * @param width 窗口宽度
   * @param height 窗口高度
   * @returns this
   */
  setSize(width?: number, height?: number): this {
    if ((width && width <= 0) || (height && height <= 0)) {
      console.warn(
        `you must be input width and height bigger then zero, width: ${width}, height: ${height}`
      );
      return this;
    }
    !width && (width = this.dom?.offsetWidth || window.innerWidth);
    !height && (height = this.dom?.offsetHeight || window.innerHeight);

    this.dispatchEvent({ type: ENGINE_EVENT.SETSIZE, width, height });
    return this;
  }

  /**
   * 设置当前相机，调用时会发布'setCamera'事件。
   * @param camera 设置当前渲染的相机对象
   * @param options 额外的选项设置，这些选项会加入到发布的'setCamera'事件中。
   * @returns this
   */
  setCamera(camera: Camera, options?: SetCameraOptions): this {
    this.dispatchEvent({
      type: ENGINE_EVENT.SETCAMERA,
      camera,
      oldCamera: this.camera,
      options: Object.assign(
        {
          orbitControls: true,
          transformControls: true,
        },
        options || {}
      ),
    });

    this.camera = camera;
    return this;
  }

  /**
   * 设置渲染场景，调用时会发布'setScene'事件。
   * 事件包含上一个场景，和切换的场景。
   * @param scene 新的场景对象
   * @returns this
   */
  setScene(scene: Scene): this {
    this.dispatchEvent({
      type: ENGINE_EVENT.SETSCENE,
      scene,
      oldScene: this.scene,
    });

    this.scene = scene;

    return this;
  }

  /**
   * 渲染方法，调用时会发布'render'事件。
   * @param delta 传入的渲染帧插值，默认为0，会加入到发布的`render`事件中。
   * @returns this
   */
  render(delta: number = 0): this {
    this.dispatchEvent({
      type: ENGINE_EVENT.RENDER,
      delta,
    });
    return this;
  }

  /**
   * 清除引擎缓存，调用时会发布'dispose'事件。
   * @returns this
   */
  dispose(): this {
    this.dispatchEvent({
      type: ENGINE_EVENT.DISPOSE,
    });
    return this;
  }
}

export interface EngineOptions {
  plugins?: PluginOptions<any>[];
  strategy?: StrategyOptions<any>[];
}

export const defineEngine = function <E extends Engine = Engine>(
  options: EngineOptions
) {
  const engine = new Engine() as E;

  if (options.plugins) {
    options.plugins.forEach((plugin) => {
      engine.install(plugin);
    });
  }

  if (options.strategy) {
    options.strategy.forEach((strategy) => {
      engine.exec(strategy);
    });
  }

  return engine;
};
