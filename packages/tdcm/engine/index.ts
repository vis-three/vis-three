import { BaseEvent, Engine, EngineOptions } from "@vis-three/core";
import {
  LoaderManager,
  LoaderManagerParameters,
  LoaderManagerPlugin,
  LoadUnit,
} from "@vis-three/plugin-loader-manager";
import {
  PointerManager,
  PointerManagerEngine,
  PointerManagerParameters,
  PointerManagerPlugin,
} from "@vis-three/plugin-pointer-manager";
import {
  EventManager,
  EventManagerEngine,
  EventManagerParameters,
  EventManagerPlugin,
} from "@vis-three/plugin-event-manager";
import {
  RenderManager,
  RenderManagerEngine,
  RenderManagerPlugin,
  RenderManagerPluginParams,
} from "@vis-three/plugin-render-manager";
import {
  DataSupportEngine,
  DataSupportManager,
  DataSupportManagerPlugin,
  DataSupportPluginParameters,
  LoadOptions,
} from "../plugin/DataSupportManagerPlugin";
import {
  MappedEvent,
  RESOURCE_EVENT,
  ResourceManager,
  ResourceManagerEngine,
  ResourceManagerPlugin,
  ResourceManagerPluginParameters,
} from "../plugin/ResourceManagerPlugin";
import { BasicConfig } from "../module/common";
import { LoaderDataSupportStrategy } from "../strategy/LoaderDataSuportStrategy";
import {
  LoaderMappingEngine,
  LoaderMappingStrategy,
} from "../strategy/LoaderMappingStrategy";
import {
  CompilerManager,
  CompilerManagerEngine,
  CompilerManagerPlugin,
  CompilerManagerPluginParameters,
} from "../plugin/CompilerManagerPlugin";
import { CompilerSupportStrategy } from "../strategy/CompilerSupportStrategy";
import {
  Compiler,
  CompilerFactory,
  DataSupportFactory,
  installProcessor,
  ModuleOptions,
  MODULETYPE,
  OBJECTMODULE,
  ProcessorCommands,
  ProcessorMembers,
} from "../module";
import { Object3D, Event, Object3DEventMap } from "three";
import {
  ModuleTrigger,
  Trigger,
  globalObjectModuleTrigger,
} from "../utils/Trigger";

export type EngineSupportLoadOptions = LoadOptions & {
  assets?: string[];
};

export interface EngineSupportParameters {
  LoaderManagerPlugin: LoaderManagerParameters;
  PointerManagerPlugin: PointerManagerParameters;
  EventManagerPlugin: EventManagerParameters;
  RenderManagerPlugin: RenderManagerPluginParams;
  ResourceManagerPlugin: ResourceManagerPluginParameters;
  DataSupportManagerPlugin: DataSupportPluginParameters;
  CompilerManagerPlugin: CompilerManagerPluginParameters;
}

export interface EngineSupportConstants {
  CONFIG_FACTORY: Record<string, () => BasicConfig>;
  MODULE_TYPE: Record<string, string>;
  CONFIG_TYPE: Record<string, string>;
  OBJECT_MODULE: Record<string, boolean>;
  CONFIG_MODULE: Record<string, string>;
}

export enum SUPPORT_LIFE_CYCLE {
  ZERO = 0,
  ONE = 100,
  TWO = 200,
  THREE = 300,
  FOUR = 400,
  FIVE = 500,
  SIX = 600,
  SEVEN = 700,
  EIGHT = 800,
  NINE = 900,
}

export class EngineSupport
  extends Engine
  implements
    PointerManagerEngine,
    EventManagerEngine,
    RenderManagerEngine,
    DataSupportEngine,
    CompilerManagerEngine,
    LoaderMappingEngine
{
  declare loaderManager: LoaderManager;
  declare eventManager: EventManager;
  declare renderManager: RenderManager;
  declare play: () => void;
  declare stop: () => void;
  declare render: (delta?: number) => this;
  declare pointerManager: PointerManager;
  declare resourceManager: ResourceManager;
  declare registerResources: (
    resourceMap: Record<string, unknown>
  ) => ResourceManagerEngine;
  declare dataSupportManager: DataSupportManager;
  declare applyConfig: (...args: BasicConfig[]) => DataSupportEngine;
  declare removeConfigBySymbol: (...args: string[]) => DataSupportEngine;
  declare toJSON: () => string;
  declare exportConfig: () => LoadOptions;
  declare compilerManager: CompilerManager;
  declare getObjectSymbol: (object: any) => string | null;
  declare getObjectBySymbol: (vid: string) => any;
  declare loadResources: (
    urlList: LoadUnit[],
    callback: (err: Error | undefined, event?: MappedEvent | undefined) => void
  ) => this;

  declare getConfigBySymbol: <C extends BasicConfig = any>(
    vid: string
  ) => C | null;
  declare getConfigfromModule: <C extends BasicConfig = any>(
    module: string,
    vid: string
  ) => C | null;
  declare getConfigfromModules: <C extends BasicConfig = any>(
    modules: string[] | Record<string, any>,
    vid: string
  ) => C | null;
  declare getObjectfromModule: <O = any>(
    module: string,
    vid: string
  ) => O | null;
  declare getObjectfromModules: <O = any>(
    modules: string[] | Record<string, any>,
    vid: string
  ) => O | null;
  declare getObject3D: <
    O extends Object3D<Object3DEventMap> = Object3D<Object3DEventMap>
  >(
    vid: string
  ) => O | null;

  declare loadResourcesAsync: (urlList: LoadUnit[]) => Promise<MappedEvent>;
  private moduleLifeCycle: Array<{ module: string; order: number }> = [];
  private moduleTriggers: ModuleTrigger[] = [globalObjectModuleTrigger];

  private processorExpands: {
    processors: string[] | RegExp;
    command: ProcessorCommands<any, any, any, any>;
  }[] = [];

  constants: EngineSupportConstants = {
    CONFIG_FACTORY: {},
    MODULE_TYPE: {},
    CONFIG_TYPE: {},
    OBJECT_MODULE: {},
    CONFIG_MODULE: {},
  };

  constructor(params: Partial<EngineSupportParameters> = {}) {
    super();
    this.install(LoaderManagerPlugin(params.LoaderManagerPlugin))
      .install(PointerManagerPlugin(params.PointerManagerPlugin))
      .install(EventManagerPlugin(params.EventManagerPlugin))
      .install(RenderManagerPlugin(params.RenderManagerPlugin))
      .install(ResourceManagerPlugin(params.ResourceManagerPlugin))
      .install(DataSupportManagerPlugin(params.DataSupportManagerPlugin))
      .install(CompilerManagerPlugin(params.CompilerManagerPlugin));

    this.exec(LoaderDataSupportStrategy())
      .exec(LoaderMappingStrategy())
      .exec(CompilerSupportStrategy());
  }

  private loadLifeCycle(config: Omit<EngineSupportLoadOptions, "assets">) {
    const dataSupportManager = this.dataSupportManager;
    const moduleTriggers = this.moduleTriggers;

    const loadCycle = this.moduleLifeCycle.sort((a, b) => a.order - b.order);

    for (const { module } of loadCycle) {
      config[module] && dataSupportManager.loadByModule(config[module], module);
      for (const trigger of moduleTriggers) {
        trigger.updateCondition(module);
        if (trigger.test()) {
          trigger.trig();
        }
      }
    }
  }

  private removeLifeCycle(config: EngineSupportLoadOptions) {
    const dataSupportManager = this.dataSupportManager;

    const removeCycle = this.moduleLifeCycle.sort((a, b) => b.order - a.order);

    for (const { module } of removeCycle) {
      config[module] && dataSupportManager.remove({ [module]: config[module] });
    }

    // 再清空外部资源缓存
    const assets = config.assets || [];
    const resourceManager = this.resourceManager;
    const loaderManager = this.loaderManager;
    assets.forEach((url) => {
      resourceManager.remove(url);
      loaderManager.remove(url);
    });
  }

  loadConfig(
    config: EngineSupportLoadOptions,
    callback?: (event?: MappedEvent) => void
  ): this {
    const renderFlag = this.renderManager.hasRendering();

    if (renderFlag) {
      this.renderManager.stop();
    }

    // 导入外部资源
    if (config.assets && config.assets.length) {
      const mappedFun = (event: MappedEvent) => {
        delete config.assets;
        this.loadLifeCycle(config);

        this.resourceManager.removeEventListener("mapped", mappedFun);
        callback && callback(event);
        if (renderFlag) {
          this.renderManager.play();
        } else {
          this.renderManager.render();
        }
      };

      this.resourceManager.addEventListener<MappedEvent>("mapped", mappedFun);
      this.loaderManager.reset().load(config.assets);
    } else {
      this.loadLifeCycle(config);
      callback && callback();

      if (renderFlag) {
        this.renderManager.play();
      } else {
        this.renderManager.render();
      }
    }

    return this;
  }

  loadConfigAsync(
    config: EngineSupportLoadOptions,
    pretreat?: (c: EngineSupportLoadOptions) => EngineSupportLoadOptions
  ): Promise<MappedEvent> {
    return new Promise((resolve, reject) => {
      const renderFlag = this.renderManager.hasRendering();

      if (renderFlag) {
        this.renderManager.stop();
      }
      // 导入外部资源
      if (config.assets && config.assets.length) {
        this.loadResourcesAsync(config.assets).then((event) => {
          delete config.assets;
          this.loadLifeCycle(config);

          if (renderFlag) {
            this.renderManager.play();
          } else {
            this.renderManager.render();
          }
          resolve(event);
        });
      } else {
        this.loadLifeCycle(config);
        if (renderFlag) {
          this.renderManager.play();
        } else {
          this.renderManager.render();
        }
        resolve({
          type: RESOURCE_EVENT.MAPPED,
          configMap: this.resourceManager.configMap,
          resourceMap: this.resourceManager.resourceMap,
          resourceConfig: {} as { [key: string]: LoadOptions },
        });
      }
    });
  }

  removeConfig(config: EngineSupportLoadOptions) {
    this.removeLifeCycle(config);
  }

  getObjectConfig<O, C extends BasicConfig>(object: O): C | null {
    const symbol = this.getObjectSymbol(object);

    if (symbol) {
      return this.getConfigBySymbol(symbol) as C | null;
    } else {
      return null;
    }
  }

  useModule<C extends Compiler = Compiler>(options: ModuleOptions<C>): this {
    if (MODULETYPE[options.type.toLocaleUpperCase()]) {
      console.warn(`module ${options.type} is already exist.`);
      return this;
    }

    MODULETYPE[options.type.toLocaleUpperCase()] = options.type;

    if (options.object) {
      OBJECTMODULE[options.type] = true;
    }

    const DataSupportClass = DataSupportFactory(options.type, options.rule);

    const CompilerClass = CompilerFactory(
      options.type,
      options.compiler,
      options.processors
    );

    for (const processor of options.processors) {
      installProcessor(processor, options.type);
    }

    const compiler = new CompilerClass() as C;
    const dataSupport = new DataSupportClass([]);

    this.dataSupportManager.extend(dataSupport);
    this.compilerManager.extend(compiler);

    compiler.useEngine(this);
    dataSupport.addCompiler(compiler);

    if (options.extend) {
      options.extend(this);
    }

    options.processors.forEach((processor) => {});

    if (options.expand) {
      this.processorExpands.push(...options.expand);
    }

    //TODO:做层cache记录哪个processor 做了 哪些拓展
    for (const config of this.processorExpands) {
      if (Array.isArray(config.processors)) {
        Object.values(ProcessorMembers).forEach((processor) => {
          if ((<string[]>config.processors).includes(processor.type)) {
            processor.expand(config.command);
          }
        });
      } else {
        Object.values(ProcessorMembers).forEach((processor) => {
          if ((<RegExp>config.processors).test(processor.type)) {
            processor.expand(config.command);
          }
        });
      }
    }

    this.moduleLifeCycle.push({
      module: options.type,
      order: options.lifeOrder || 0,
    });

    this.moduleTriggers.forEach((trigger) => {
      trigger.registerModule(options.type);
    });

    return this;
  }

  /**
   * @deprecated
   * use useModule
   */
  registModule<C extends Compiler = Compiler>(options: ModuleOptions<C>): this {
    return this.useModule(options);
  }
}

export interface EngineSupportOptions extends EngineOptions {
  modules: ModuleOptions<any>[];
}

export const defineEngineSupport = function <
  E extends EngineSupport = EngineSupport
>(
  options: EngineSupportOptions,
  params: Partial<EngineSupportParameters> = {}
) {
  const engine = new EngineSupport(params) as E;

  if (options.modules) {
    options.modules.forEach((module) => {
      engine.useModule(module);
    });
  }

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
