import {
  EngineSupport,
  EngineSupportLoadOptions,
} from "../engine/EngineSupport";
import { EventLibrary, generateConfig } from "../main";
import { LoadUnit } from "../manager/LoaderManager";
import { SymbolConfig } from "../middleware/common/CommonConfig";
import { CONFIGFACTORY } from "../middleware/constants/CONFIGFACTORY";
import { getModule } from "../middleware/constants/CONFIGMODULE";
import { CONFIGTYPE } from "../middleware/constants/configType";
import { MODULETYPE, OBJECTMODULE } from "../middleware/constants/MODULETYPE";
import { GroupConfig } from "../middleware/group/GroupConfig";
import { ObjectConfig } from "../middleware/object/ObjectConfig";
import { EventDispatcher } from "./EventDispatcher";
import { ProxyEvent, ProxyNotice } from "./ProxyBroadcast";
import { Dependence } from "./widget/Dependence";
import { Observer } from "./widget/Observer";
import { createElement, onComputed, Updater } from "./widget/render";

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
    onComputed: (fun: () => any) => Updater
  ) => Record<string, ReturnType<typeof CONFIGFACTORY[CONFIGTYPE]>>;
  data?: () => Record<string, any>;
  computed?: Record<string, Function>;
  watch?: Record<string, Function>;
  methods?: Record<string, Function>;
  beforeLoad?: WigetLifetimes["beforeLoad"];
  loaded?: WigetLifetimes["loaded"];
  beforeCreate?: WigetLifetimes["beforeCreate"];
  created?: WigetLifetimes["created"];
  beforeDispose?: WigetLifetimes["beforeDispose"];
  disposed?: WigetLifetimes["disposed"];
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

  private render: Record<string, ReturnType<typeof CONFIGFACTORY[CONFIGTYPE]>> =
    {};
  private observer = new Observer();
  private dependence = new Dependence();

  constructor(options: WidgetOptions) {
    super();
    this.options = options;
  }

  // 创建Computed
  private createComputed() {
    const computed = this.options.computed || {};

    for (const key in computed) {
      this.observed[key] = this.dependence.collect(
        key,
        this.observer,
        computed[key].bind(this.observed)
      );
    }
  }

  private createRender() {
    const render = this.options.render.call(
      this.observed,
      createElement,
      () => {},
      onComputed
    );

    const recursion = (object: object, path: Array<string>) => {
      for (const key in object) {
        if (typeof object[key] === "object" && object[key] !== null) {
          recursion(object[key], path.concat([key]));
        } else if (typeof object[key] === "symbol") {
          const updater = Updater.get(object[key]);
          if (!updater) {
            console.error(
              `Widget createRender can not found this updater: ${object[key]}`
            );
          } else {
            object[key] = this.dependence.collect(
              `${path.join(".")}.${key}`,
              this.observer,
              updater.run.bind(this.observed)
            );
          }
        }
      }
    };

    recursion(render, []);

    this.render = render;

    Object.assign(this.observed, this.render);
  }

  // 创建观察者
  private createObserver() {
    const options = this.options;
    const computed = Object.assign({}, options.computed || {});

    for (const key in computed) {
      computed[key] = null as unknown as Function;
    }
    this.observed = this.observer.proxyExtends(
      Object.assign(
        {},
        options.input,
        options.data ? options.data() : {},
        computed,
        options.methods || {}
      ),
      [],
      false
    );
  }

  private createWatch() {
    const watch = this.options.watch || {};
    this.observer.addEventListener<ProxyEvent>(
      "broadcast",
      (event: ProxyEvent) => {
        const { operate, key, path, value } = event.notice;
        if (operate !== "get") {
          const sign = path.length ? `${path.join(".")}.${key}` : key;

          if (watch[sign]) {
            watch[sign].call(this.observed, value);
          }
        }
      }
    );
  }

  private createMethods() {
    const methods = this.options.methods || {};
    // TODO:
    // EventLibrary.register({name: } as BasicEventConfig)
  }

  async init(engineSupport: EngineSupport) {
    const options = this.options;

    // 加载资源
    options.beforeLoad && options.beforeLoad();

    if (options.resources) {
      await engineSupport.loadResourcesAsync(Object.values(options.resources));
    }

    options.loaded && options.loaded();

    this.createObserver();
    this.createComputed();
    this.createRender();
    this.createWatch();

    options.beforeCreate && options.beforeCreate();

    const configure: EngineSupportLoadOptions = {};

    Object.values(this.render).forEach((config) => {
      const model = getModule(config.type);
      if (!model) {
        console.warn(`widget can not support this config type: ${config.type}`);
      } else if (configure[model]) {
        (<object>configure[model])[config.vid] = config;
      } else {
        configure[model] = {
          [config.vid]: config as any,
        };
      }
    });

    // 打包成组

    const group = generateConfig(CONFIGTYPE.GROUP) as GroupConfig;

    // 更新parent
    Object.keys(configure).forEach((key) => {
      if (key.toLocaleUpperCase() in OBJECTMODULE) {
        Object.values(configure[key]).forEach((config) => {
          if (!(config as ObjectConfig).parent) {
            group.children.push((config as ObjectConfig).vid);
          }
        });
      }
    });

    if (configure[MODULETYPE.GROUP]) {
      configure[MODULETYPE.GROUP]![group.vid] = group;
    } else {
      configure[MODULETYPE.GROUP] = {
        [group.vid]: group,
      };
    }

    engineSupport.loadConfig(configure);

    (<ObjectConfig>(
      engineSupport.getConfigBySymbol(options.parent)
    )).children.push(group.vid);

    options.created && options.created();
  }

  exportConfig() {}

  loadConfig() {}
}
