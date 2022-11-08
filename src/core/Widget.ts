import {
  EngineSupport,
  EngineSupportLoadOptions,
} from "../engine/EngineSupport";
import {
  BasicEventConfig,
  EventGenerator,
} from "../library/event/EventLibrary";
import { EventLibrary, generateConfig } from "../main";
import { ObjectEvent } from "../manager/EventManager";
import { LoadUnit } from "../manager/LoaderManager";
import { SymbolConfig } from "../middleware/common/CommonConfig";
import { CONFIGFACTORY } from "../middleware/constants/CONFIGFACTORY";
import { getModule } from "../middleware/constants/CONFIGMODULE";
import { CONFIGTYPE } from "../middleware/constants/configType";
import { MODULETYPE, OBJECTMODULE } from "../middleware/constants/MODULETYPE";
import { GroupConfig } from "../middleware/group/GroupConfig";
import { ObjectConfig } from "../middleware/object/ObjectConfig";
import { EventDispatcher } from "./EventDispatcher";
import { Observer } from "./widget/Observer";
import { createElement, onComputed, onEvent } from "./widget/render";
import { getObservable, Ignore, observable } from "./Observable";
import { Watcher } from "./widget/Watcher";
import { clone, handler, planish } from "../convenient/Template";
import { antiShake } from "../utils/AntiShake";

export interface WigetLifetimes {
  beforeLoad?: Function;
  loaded?: Function;
  beforeCreate?: Function;
  created?: Function;
  beforeDispose?: Function;
  disposed?: Function;
}

export interface WidgetOptions {
  name: string;
  input?: Record<string, any>;
  load?: Array<LoadUnit>;
  resources?: () => Record<string, any>;
  parent: string;
  render: (
    e: (
      type: CONFIGTYPE,
      merge: any
    ) => ReturnType<typeof CONFIGFACTORY[CONFIGTYPE]>,
    c: () => any,
    onComputed: (fun: () => any) => Watcher,
    onEvent: (fun: (event?: ObjectEvent) => void) => void,
    onResource: (url: string) => any
  ) => Record<string, ReturnType<typeof CONFIGFACTORY[CONFIGTYPE]>>;
  data?: (ignore: Ignore) => Record<string, any>;
  computed?: Record<string, () => any>;
  watch?: Record<
    string,
    | Function
    | {
        handler: Function;
        immediate: boolean;
      }
  >;
  methods?: Record<string, Function>;
  beforeLoad?: WigetLifetimes["beforeLoad"];
  loaded?: WigetLifetimes["loaded"];
  beforeCreate?: WigetLifetimes["beforeCreate"];
  created?: WigetLifetimes["created"];
  beforeDispose?: WigetLifetimes["beforeDispose"];
  disposed?: WigetLifetimes["disposed"];
  sceneChange?: Function;
  cameraChange?: Function;
}

export class Widget extends EventDispatcher {
  private static components: Record<string, WidgetOptions> = {};

  static component = function (options: WidgetOptions) {
    if (Widget.components[options.name]) {
      console.warn(`${options.name} components has exist`);
      return;
    }

    Widget.components[options.name] = options;
  };

  observed: Record<string, any> = {};

  private options: WidgetOptions;

  private render?: Record<string, true> = {};
  private observer = new Observer();

  constructor(options: WidgetOptions) {
    super();
    this.options = options;
  }

  private async createLoad(engineSupport: EngineSupport) {
    const options = this.options;
    const resources = options.load;

    // 加载资源
    options.beforeLoad && options.beforeLoad();

    if (resources) {
      await engineSupport.loadResourcesAsync(resources);
    }

    options.loaded && options.loaded();
  }

  // 创建Computed
  private createComputed() {
    const computed = this.options.computed || {};

    for (const key in computed) {
      this.observed[key] = onComputed(computed[key].bind(this.observed)).token;
    }
  }

  private createRender(engineSupport: EngineSupport) {
    const render = this.options.render.call(
      this.observed,
      createElement,
      () => {},
      onComputed,
      onEvent,
      (url: string) => {
        return planish(
          handler(
            clone(engineSupport.resourceManager.getResourceConfig(url), {
              fillName: true,
            }) as EngineSupportLoadOptions,
            (config) => createElement(config.type as CONFIGTYPE, config)
          )
        );
      }
    );

    for (const key in render) {
      this.observed[key] = render[key];
      this.render![key] = true;
    }

    for (const key in this.options.resources || {}) {
      delete this.observed[key];
    }
  }

  private createObserved() {
    const options = this.options;

    const ignore = {};

    const methods = options.methods || {};

    for (const key in methods) {
      ignore[key] = true;
    }

    const data = Object.assign(
      this.observed,
      options.input,
      options.data && options.data(ignore),
      methods
    );

    options.beforeCreate && options.beforeCreate(data);

    this.observed = observable(data, ignore);
  }

  private createResources(engineSupport: EngineSupport) {
    const resources = this.options.resources;

    if (resources) {
      engineSupport.registerResources(resources.call(this.observed));
    }
  }

  // 初始观察者
  private initObserver() {
    this.observer.watch(this.observed);
    this.options.created && this.options.created.call(this.observed);
  }

  private createWatch() {
    const watch = this.options.watch || {};
    for (const wPath in watch) {
      const watcher = watch[wPath];
      let handler: Function;
      if (typeof watcher === "object") {
        if (watcher.immediate) {
          let object = this.observed;
          const walk = wPath.split(".");
          const key = walk.pop()!;
          for (const key of walk) {
            object = object[key];
          }
          const value = object[key];
          watcher.handler.call(this.observed, value);
        }
        handler = watcher.handler;
      } else {
        handler = watcher;
      }
      this.observer.subscribe((notice) => {
        const { operate, key, path, value } = notice;
        if (operate !== "get" && wPath === path) {
          handler.call(this.observed, value);
        }
      });
    }
  }

  async init(engineSupport: EngineSupport) {
    const options = this.options;

    await this.createLoad(engineSupport);
    this.createObserved();
    this.createResources(engineSupport);
    this.createComputed();
    this.createRender(engineSupport);
    this.initObserver();

    const dataSupportManager = engineSupport.dataSupportManager;
    // 打包成组
    const group = generateConfig(CONFIGTYPE.GROUP) as GroupConfig;

    Object.keys(this.render!).forEach((key) => {
      const config = this.observed[key];
      const model = getModule(config.type);
      if (!model) {
        console.warn(`widget can not support this config type: ${config.type}`);
      } else {
        // 更新parent
        if (model.toLocaleUpperCase() in OBJECTMODULE) {
          if (!(config as ObjectConfig).parent) {
            group.children.push((config as ObjectConfig).vid);
          }
        }
        dataSupportManager.applyConfig(config);
      }
    });

    dataSupportManager.applyConfig(group);

    (<ObjectConfig>(
      engineSupport.getConfigBySymbol(options.parent)
    )).children.push(group.vid);

    antiShake.append(() => {
      this.createWatch();
      return true;
    });
  }

  exportConfig() {}

  loadConfig() {}
}
