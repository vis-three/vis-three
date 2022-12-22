import { Camera, PerspectiveCamera, Scene } from "three";
import { BaseEvent, EventDispatcher } from "../eventDispatcher";
import { PluginOptions } from "../plugin";
import { StrategyOptions } from "../strategy";

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
  pluginTables = new Map<string, PluginOptions<Engine>>();
  strategyTables = new Map<string, StrategyOptions<Engine>>();

  dom: HTMLElement = document.createElement("div");
  camera: Camera = new PerspectiveCamera();
  scene: Scene = new Scene();

  render: () => void;

  constructor() {
    super();

    this.camera.position.set(50, 50, 50);

    this.render = function () {
      console.warn("can not install some plugin");
    };
  }

  /**
   * 安装插件
   * @param plugin
   * @returns
   */
  install<E extends Engine>(plugin: PluginOptions<E>): E {
    if (this.pluginTables.has(plugin.name)) {
      console.warn(`This plugin already exists`, plugin.name);
      return this as unknown as E;
    }

    const validateDep = (name: string) => {
      if (!this.pluginTables.has(name)) {
        console.error(
          `${plugin.name} must install this plugin before: ${name}`
        );
        return false;
      }
      return true;
    };

    // 检测deps
    if (plugin.deps) {
      if (Array.isArray(plugin.deps)) {
        for (const name of plugin.deps) {
          if (!validateDep(name)) {
            this as unknown as E;
          }
        }
      } else {
        if (!validateDep(plugin.deps)) {
          this as unknown as E;
        }
      }
    }

    plugin.install(this as unknown as E);

    this.pluginTables.set(plugin.name, plugin as PluginOptions<Engine>);
    return this as unknown as E;
  }

  /**
   * 卸载插件
   * @param plugin
   * @returns
   */
  unistall(name: string): this {
    if (!this.pluginTables.has(name)) {
      return this;
    }

    const plugin = this.pluginTables.get(name)!;

    plugin.dispose(this);

    this.pluginTables.delete(name);
    return this;
  }

  /**
   * 执行策略
   * @returns
   */
  exec<E extends Engine>(strategy: StrategyOptions<E>): E {
    const tables = this.strategyTables;
    if (tables.has(strategy.name)) {
      console.warn(`This strategy already exists`, strategy.name);
      return this as unknown as E;
    }
    // 检测条件
    const plugins = this.pluginTables;
    for (const plugin of strategy.condition) {
      if (!plugins.has(plugin)) {
        console.warn(
          `${strategy.name} does not meet the conditions for execution: ${plugin}`
        );
        return this as unknown as E;
      }
    }

    strategy.exec(this as unknown as E);

    tables.set(strategy.name, strategy as StrategyOptions<Engine>);

    return this as unknown as E;
  }

  /**
   * 回滚策略
   * @returns
   */
  rollback(name: string): this {
    const tables = this.strategyTables;
    if (!tables.has(name)) {
      return this;
    }

    const strategy = tables.get(name)!;

    strategy.rollback(this);

    tables.delete(name);
    return this;
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

export interface EngineOptions {
  plugins?: PluginOptions<any>[];
  strategy?: StrategyOptions<any>[];
}

export const defineEngine = function (options: EngineOptions) {
  const engine = new Engine();

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
