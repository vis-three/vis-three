import {
  Camera,
  Material,
  Object3D,
  PerspectiveCamera,
  Scene,
  Texture,
  WebGLRenderer,
  WebGLRendererParameters,
} from "three";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";

import { BaseEvent, EventDispatcher } from "../core/EventDispatcher";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderManager } from "../manager/RenderManager";
import { RenderManagerPlugin } from "../plugins/RenderManagerPlugin";
import { OrbitControlsPlugin } from "../plugins/OrbitControlsPlugin";
import { VisStatsParameters } from "../optimize/VisStats";
import Stats from "three/examples/jsm/libs/stats.module";
import { StatsPlugin } from "../plugins/StatsPlugin";
import {
  EffectComposerParameters,
  EffectComposerPlugin,
} from "../plugins/EffectComposerPlugin";
import { PointerManager } from "../manager/PointerManager";
import { PointerManagerParameters } from "../manager/PointerManager";
import { PointerManagerPlugin } from "../plugins/PointerManagerPlugin";
import { EventManager, EventManagerParameters } from "../manager/EventManager";
import { EventManagerPlugin } from "../plugins/EventManagerPlugin";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { TransformControlsPlugin } from "../plugins/TransformControlsPlugin";
import {
  Screenshot,
  WebGLRendererPlugin,
} from "../plugins/WebGLRendererPlugin";
import {
  LoadedEvent,
  LoaderManager,
  LoaderManagerParameters,
} from "../manager/LoaderManager";
import { LoaderManagerPlugin } from "../plugins/LoaderManagerPlugin";
import { MappedEvent, ResourceManager } from "../manager/ResourceManager";
import {
  ResourceManagerPlugin,
  ResourceManagerPluginParameters,
} from "../plugins/ResourceManagerPlugin";
import {
  DataSupportManager,
  DataSupportManagerParameters,
  LoadOptions,
} from "../manager/DataSupportManager";
import { DataSupportManagerPlugin } from "../plugins/DataSupportManagerPlugin";
import {
  CompilerManager,
  CompilerManagerParameters,
} from "../manager/CompilerManager";
import { CompilerManagerPlugin } from "../plugins/CompilerManagerPlugin";
import { KeyboardManager } from "../manager/KeyboardManager";
import { KeyboardManagerPlugin } from "../plugins/KeyboardManagerPlugin";
import {
  VIEWPOINT,
  ViewpointParameters,
  ViewpointPlugin,
} from "../plugins/ViewpointPlugin";
import {
  AxesHelperParameters,
  AxesHelperPlugin,
} from "../plugins/AxesHelperPlugin";
import {
  GridHelperParameters,
  GridHelperPlugin,
} from "../plugins/GridHelperPlugin";
import {
  DISPLAYMODE,
  DisplayModelPlugin,
  DisplayModeParameters,
} from "../plugins/DisplayModePlugin";
import {
  ObjectHelperParameters,
  ObjectHelperPlugin,
} from "../plugins/ObjectHelperPlugin";
import {
  SelectionParameters,
  SelectionPlugin,
} from "../plugins/SelectionPlugin";
import { ObjectHelperManager } from "../manager/ObjectHelperManager";
import { VisOrbitControls } from "../optimize/VisOrbitControls";
import { SymbolConfig } from "../middleware/common/CommonConfig";
import {
  CSS3DRendererParameters,
  CSS3DRendererPlugin,
} from "../plugins/CSS3DRendererPlugin";

// 存在的插件接口
export enum ENGINEPLUGIN {
  WEBGLRENDERER = "WebGLRenderer",
  CSS3DRENDERER = "CSS3DRenderer",
  SCENE = "Scene",
  MODELINGSCENE = "ModelingScene",
  RENDERMANAGER = "RenderManager",
  ORBITCONTROLS = "OrbitControls",
  STATS = "Stats",
  EFFECTCOMPOSER = "EffectComposer",
  POINTERMANAGER = "PointerManager",
  EVENTMANAGER = "EventManager",
  TRANSFORMCONTROLS = "TransformControls",
  LOADERMANAGER = "LoaderManager",
  RESOURCEMANAGER = "ResourceManager",
  DATASUPPORTMANAGER = "DataSupportManager",
  COMPILERMANAGER = "CompilerManager",
  KEYBOARDMANAGER = "KeyboardManager",
  AXESHELPER = "AxesHelper",
  GRIDHELPER = "GridHelper",
  VIEWPOINT = "Viewpoint",
  DISPLAYMODE = "DisplayMode",
  OBJECTHELPER = "ObjectHelper",
  SELECTION = "Selection",
}

// 引擎事件

// 设置dom
export interface SetDomEvent extends BaseEvent {
  type: "setDom";
  dom: HTMLElement;
}
// 设置相机

export interface SetCameraOptions {
  orbitControls?: boolean;
  transformControls?: boolean;
}
export interface SetCameraEvent extends BaseEvent {
  type: "setCamera";
  camera: Camera;
  options: SetCameraOptions;
}

// 设置场景
export interface SetSceneEvent extends BaseEvent {
  type: "setScene";
  scene: Scene;
  oldScene: Scene;
}

// 设置尺寸
export interface SetSizeEvent extends BaseEvent {
  type: "setSize";
  width: number;
  height: number;
}

// 引擎槽
export class Engine extends EventDispatcher {
  static pluginHandler: Map<string, Function> | undefined = new Map();

  // 注册引擎插件
  static register = function <T extends object>(
    name: string,
    handler: (this: Engine, params: T) => void
  ): typeof Engine {
    Engine.pluginHandler && Engine.pluginHandler.set(name, handler);
    return Engine;
  };

  // 清空插件缓存
  static dispose = function () {
    Engine.pluginHandler = undefined;
  };

  completeSet: Set<(engine: Engine) => void>;

  camera: Camera = new PerspectiveCamera();
  scene: Scene = new Scene();

  IS_ENGINESUPPORT = false;

  dom?: HTMLElement;
  webGLRenderer?: WebGLRenderer;
  css3DRenderer?: CSS3DRenderer;

  orbitControls?: VisOrbitControls;
  transformControls?: TransformControls;
  effectComposer?: EffectComposer;
  renderManager?: RenderManager;
  pointerManager?: PointerManager;
  eventManager?: EventManager;
  loaderManager?: LoaderManager;
  resourceManager?: ResourceManager;
  dataSupportManager?: DataSupportManager;
  compilerManager?: CompilerManager;
  keyboardManager?: KeyboardManager;
  objectHelperManager?: ObjectHelperManager;
  transing?: boolean;
  stats?: Stats;
  displayMode?: DISPLAYMODE;
  selectionBox?: Set<Object3D>;

  getScreenshot?: (params: Screenshot) => string;

  setStats?: (show: boolean) => this;
  setTransformControls?: (show: boolean) => this;
  setViewpoint?: (viewpoint: VIEWPOINT) => this;
  setDisplayMode?: (mode: DISPLAYMODE) => this;
  setAxesHelper?: (params: { show: boolean }) => this;
  setGridHelper?: (params: { show: boolean }) => this;
  setObjectHelper?: (params: { show: boolean }) => this;
  setSelectionBox?: (params: { objects: Object3D[] }) => this;

  loadResources?: (
    urlList: Array<string>,
    callback: (
      err: Error | undefined,
      event?: LoadedEvent | MappedEvent
    ) => void
  ) => this;
  loadResourcesAsync?: (
    urlList: Array<string>
  ) => Promise<LoadedEvent | MappedEvent>;

  registerResources?: (resourceMap: { [key: string]: unknown }) => this;

  toJSON?: () => string;
  exportConfig?: (compress: boolean) => LoadOptions;

  applyConfig?: <T extends SymbolConfig>(...configs: T[]) => this;
  reactiveConfig?: <T extends SymbolConfig>(config: T) => T;
  getConfigBySymbol?: <T extends SymbolConfig>(vid: string) => T | null;
  removeConfigBySymbol?: (...vids: string[]) => this;

  getObjectSymbol?: (object: any) => SymbolConfig["vid"] | null;
  getObjectBySymbol?: (vid: string) => Object3D | Texture | Material | null;

  play?: () => this;
  stop?: () => this;
  render?: () => this;

  constructor() {
    super();

    this.completeSet = new Set();
    this.render = function () {
      console.warn("can not install some plugin");
      return this;
    };

    this.camera.position.set(50, 50, 50);

    this.addEventListener<SetSizeEvent>("setSize", (event) => {
      (this.camera as PerspectiveCamera).aspect = event.width / event.height;
      (this.camera as PerspectiveCamera).updateProjectionMatrix();
    });
  }

  /**
   * 优化内存
   */
  protected optimizeMemory() {
    Object.keys(this).forEach((key) => {
      if (this[key] === undefined) {
        delete this[key];
      }
    });
  }

  // 安装插件
  install<T extends object>(plugin: ENGINEPLUGIN, params?: T): this {
    if (Engine.pluginHandler!.has(plugin)) {
      Engine.pluginHandler!.get(plugin)!.call(this, params);
    } else {
      console.error(`engine can not support ${plugin} plugin.`);
    }
    return this;
  }

  // 完成
  complete(): this {
    this.completeSet.forEach((fun) => {
      fun(this);
    });
    this.completeSet.clear();
    return this;
  }

  /**
   * 清除引擎缓存
   * @returns this
   */
  dispose(): this {
    this.dispatchEvent({
      type: "dispose",
    });
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
      type: "setDom",
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

    this.dispatchEvent({ type: "setSize", width, height });
    return this;
  }

  /**
   * 设置相机
   * @param vid 相机标识
   * @param options 设置相机的参数
   * @returns this
   */
  setCamera(vid: string, options?: SetCameraOptions): this;
  /**
   * 设置相机
   * @param camera 相机对象
   * @param options 设置相机的参数
   * @returns this
   */
  setCamera(camera: Camera, options?: SetCameraOptions): this;
  setCamera(camera: Camera | string, options?: SetCameraOptions): this {
    if (typeof camera === "object" && camera instanceof Camera) {
      this.camera = camera;
      this.dispatchEvent({
        type: "setCamera",
        camera,
        options: Object.assign(
          {
            orbitControls: true,
            transformControls: true,
          },
          options || {}
        ),
      });
    } else {
      if (this.IS_ENGINESUPPORT) {
        const target = this.compilerManager!.getObjectBySymbol(
          camera as string
        ) as Camera;

        if (target) {
          this.camera = target;
          this.dispatchEvent({
            type: "setCamera",
            camera: target,
            options: Object.assign(
              {
                orbitControls: true,
                transformControls: true,
              },
              options || {}
            ),
          });
        } else {
          console.warn(`can not found camera in compilerManager: ${camera}`);
        }
      } else {
        console.warn(
          `engine is not a Engine support but use symbol to found camera.`
        );
      }
    }
    return this;
  }

  /**
   * 设置场景
   * @param vid 场景标识
   * @returns this
   */
  setScene(vid: string): this;
  /**
   * 设置场景
   * @param scene 场景对象
   * @returns this
   */
  setScene(scene: Scene): this;
  setScene(scene: Scene | string): this {
    if (typeof scene === "object" && scene instanceof Scene) {
      this.dispatchEvent({
        type: "setScene",
        scene,
        oldScene: this.scene,
      });
      this.scene = scene;
    } else {
      if (this.IS_ENGINESUPPORT) {
        const target = this.compilerManager!.getObjectBySymbol(
          scene as string
        ) as Scene;

        if (target) {
          this.dispatchEvent({
            type: "setScene",
            scene: target,
            oldScene: this.scene,
          });
          this.scene = target;
        } else {
          console.warn(`can not found scene in compilerManager: ${scene}`);
        }
      } else {
        console.warn(
          `engine is not a Engine support but use symbol to found scene.`
        );
      }
    }
    return this;
  }
}

Engine.register<WebGLRendererParameters>(
  ENGINEPLUGIN.WEBGLRENDERER,
  WebGLRendererPlugin
);

Engine.register<CSS3DRendererParameters>(
  ENGINEPLUGIN.CSS3DRENDERER,
  CSS3DRendererPlugin
);

Engine.register<EffectComposerParameters>(
  ENGINEPLUGIN.EFFECTCOMPOSER,
  EffectComposerPlugin
);

Engine.register<object>(ENGINEPLUGIN.RENDERMANAGER, RenderManagerPlugin);
Engine.register<PointerManagerParameters>(
  ENGINEPLUGIN.POINTERMANAGER,
  PointerManagerPlugin
);
Engine.register<EventManagerParameters>(
  ENGINEPLUGIN.EVENTMANAGER,
  EventManagerPlugin
);
Engine.register<LoaderManagerParameters>(
  ENGINEPLUGIN.LOADERMANAGER,
  LoaderManagerPlugin
);
Engine.register<ResourceManagerPluginParameters>(
  ENGINEPLUGIN.RESOURCEMANAGER,
  ResourceManagerPlugin
);
Engine.register<DataSupportManagerParameters>(
  ENGINEPLUGIN.DATASUPPORTMANAGER,
  DataSupportManagerPlugin
);
Engine.register<CompilerManagerParameters>(
  ENGINEPLUGIN.COMPILERMANAGER,
  CompilerManagerPlugin
);
Engine.register<object>(ENGINEPLUGIN.KEYBOARDMANAGER, KeyboardManagerPlugin);

Engine.register<object>(ENGINEPLUGIN.ORBITCONTROLS, OrbitControlsPlugin);
Engine.register<object>(
  ENGINEPLUGIN.TRANSFORMCONTROLS,
  TransformControlsPlugin
);

Engine.register<AxesHelperParameters>(
  ENGINEPLUGIN.AXESHELPER,
  AxesHelperPlugin
);
Engine.register<GridHelperParameters>(
  ENGINEPLUGIN.GRIDHELPER,
  GridHelperPlugin
);
Engine.register<ObjectHelperParameters>(
  ENGINEPLUGIN.OBJECTHELPER,
  ObjectHelperPlugin
);

Engine.register<DisplayModeParameters>(
  ENGINEPLUGIN.DISPLAYMODE,
  DisplayModelPlugin
);
Engine.register<ViewpointParameters>(ENGINEPLUGIN.VIEWPOINT, ViewpointPlugin);
Engine.register<VisStatsParameters>(ENGINEPLUGIN.STATS, StatsPlugin);
Engine.register<SelectionParameters>(ENGINEPLUGIN.SELECTION, SelectionPlugin);
