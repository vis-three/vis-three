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
import { getObservable, observable } from "./Observable";
import { Watcher } from "./widget/Watcher";

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
  resources?: Record<string, string | LoadUnit>;
  parent: string;
  render: (
    e: (
      type: CONFIGTYPE,
      merge: any
    ) => ReturnType<typeof CONFIGFACTORY[CONFIGTYPE]>,
    c: () => any,
    onComputed: (fun: () => any) => Watcher,
    onEvent: (fun: (event?: ObjectEvent) => void) => void
  ) => Record<string, ReturnType<typeof CONFIGFACTORY[CONFIGTYPE]>>;
  data?: () => Record<string, any>;
  computed?: Record<string, () => any>;
  watch?: Record<string, Function>;
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

  component = function (options: WidgetOptions) {
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

  // 创建Computed
  private createComputed() {
    const computed = this.options.computed || {};

    for (const key in computed) {
      this.observed[key] = onComputed(computed[key].bind(this.observed)).token;
    }
  }

  private createRender() {
    const render = this.options.render.call(
      this.observed,
      createElement,
      () => {},
      onComputed,
      onEvent
    );

    for (const key in render) {
      this.observed[key] = render[key];
      this.render![key] = true;
    }
  }

  private createObserved() {
    const options = this.options;

    const ignore = {};

    const methods = options.methods || {};

    for (const key in methods) {
      ignore[key] = true;
    }

    this.observed = observable(
      Object.assign(
        this.observed,
        options.input,
        options.data && options.data(),
        methods
      ),
      ignore
    );
  }

  // 初始观察者
  private initObserver() {
    this.observer.watch(this.observed);
  }

  private createWatch() {
    const watch = this.options.watch || {};
    // this.observer.addEventListener<ProxyEvent>(
    //   "broadcast",
    //   (event: ProxyEvent) => {
    //     const { operate, key, path, value } = event.notice;
    //     if (operate !== "get") {
    //       const sign = path.length ? `${path.join(".")}.${key}` : key;

    //       if (watch[sign]) {
    //         watch[sign].call(this.observable, value);
    //       }
    //     }
    //   }
    // );
  }

  async init(engineSupport: EngineSupport) {
    const options = this.options;

    // 加载资源
    options.beforeLoad && options.beforeLoad();

    if (options.resources) {
      await engineSupport.loadResourcesAsync(Object.values(options.resources));
    }

    options.loaded && options.loaded();

    this.createObserved();
    this.createComputed();
    this.createRender();
    this.initObserver();
    this.createWatch();

    options.beforeCreate && options.beforeCreate();

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

    options.created && options.created();
  }

  exportConfig() {}

  loadConfig() {}
}
