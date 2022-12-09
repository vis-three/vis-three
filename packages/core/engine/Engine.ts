import { Camera, PerspectiveCamera, Scene } from "three";
import { BaseEvent, EventDispatcher } from "../eventDispatcher";
import { Plugin, PluginOptions } from "../plugin";

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

export enum ENGINE_EVENT {
  SETDOM = "setDom",
  SETSIZE = "setSize",
  SETCAMERA = "setCamera",
  SETSCENE = "setScene",
  DISPOSE = "dispose",
}

// 引擎槽
export class Engine extends EventDispatcher {
  pluginTables = new Map<string, Plugin<any> | Plugin<any>[]>();

  dom: HTMLElement = document.createElement("div");
  camera: Camera = new PerspectiveCamera();
  scene: Scene = new Scene();

  render: () => void;
  play: () => void;
  stop: () => void;

  constructor() {
    super();

    this.render = function () {
      console.warn("can not install some plugin");
    };

    this.play = this.render;
    this.stop = this.render;
  }

  // 安装插件
  install<E extends Engine>(plugin: PluginOptions<E>): E {
    return this as unknown as E;
  }

  /**
   * 设置输出的dom
   * @param dom HTMLElement
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
   * 设置引擎整体尺寸
   * @param width number
   * @param height number
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
   * 设置当前相机
   * @param camera
   * @param options
   * @returns
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
   * 设置渲染场景
   * @param scene
   * @returns
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
   * 清除引擎缓存
   * @returns this
   */
  dispose(): this {
    this.dispatchEvent({
      type: ENGINE_EVENT.DISPOSE,
    });
    return this;
  }
}
