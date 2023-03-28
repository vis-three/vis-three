import { Engine, EngineOptions } from "@vis-three/core";
import {
  LoaderManager,
  LoaderManagerPlugin,
  LoadUnit,
} from "@vis-three/plugin-loader-manager";
import {
  PointerManager,
  PointerManagerEngine,
  PointerManagerPlugin,
} from "@vis-three/plugin-pointer-manager";
import {
  EventManager,
  EventManagerEngine,
  EventManagerPlugin,
} from "@vis-three/plugin-event-manager";
import {
  RenderManager,
  RenderManagerEngine,
  RenderManagerPlugin,
} from "@vis-three/plugin-render-manager";
import {
  DataSupportEngine,
  DataSupportManager,
  DataSupportManagerPlugin,
  LoadOptions,
} from "../plugin/DataSupportManagerPlugin";
import {
  MappedEvent,
  ResourceManager,
  ResourceManagerEngine,
  ResourceManagerPlugin,
} from "../plugin/ResourceManagerPlugin";
import { SymbolConfig } from "../module/common";
import { LoaderDataSupportStrategy } from "../strategy/LoaderDataSuportStrategy";
import {
  LoaderMappingEngine,
  LoaderMappingStrategy,
} from "../strategy/LoaderMappingStrategy";
import {
  CompilerManager,
  CompilerManagerEngine,
  CompilerManagerPlugin,
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
} from "../module";
import { Object3D, Event } from "three";

export type EngineSupportLoadOptions = LoadOptions & {
  assets?: string[];
};

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
  declare render: (delta: number) => this;
  declare pointerManager: PointerManager;
  declare resourceManager: ResourceManager;
  declare registerResources: (
    resourceMap: Record<string, unknown>
  ) => ResourceManagerEngine;
  declare dataSupportManager: DataSupportManager;
  declare applyConfig: (...args: SymbolConfig[]) => DataSupportEngine;
  declare getConfigBySymbol: (vid: string) => SymbolConfig | null;
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
  declare loadResourcesAsync: (urlList: LoadUnit[]) => Promise<MappedEvent>;
  declare getObjectfromModule: (module: string, vid: string) => object | null;
  declare getObjectfromModules: (
    modules: string[] | Record<string, any>,
    vid: string
  ) => object | null;
  declare getObject3D: (vid: string) => Object3D<Event> | null;

  constructor() {
    super();
    this.install(LoaderManagerPlugin())
      .install(PointerManagerPlugin())
      .install(EventManagerPlugin())
      .install(RenderManagerPlugin())
      .install(ResourceManagerPlugin())
      .install(DataSupportManagerPlugin())
      .install(CompilerManagerPlugin());

    this.exec(LoaderDataSupportStrategy())
      .exec(LoaderMappingStrategy())
      .exec(CompilerSupportStrategy());
  }

  private loadLifeCycle(config: Omit<EngineSupportLoadOptions, "assets">) {
    const dataSupportManager = this.dataSupportManager;

    // 生成贴图
    config.texture && dataSupportManager.load({ texture: config.texture });

    // 生成材质
    config.material && dataSupportManager.load({ material: config.material });

    // 其他
    delete config.texture;
    delete config.material;

    dataSupportManager.load(config);
  }

  private removeLifeCycle(config: EngineSupportLoadOptions) {
    const dataSupportManager = this.dataSupportManager;
    const texture = config[MODULETYPE.TEXTURE] || [];
    const material = config[MODULETYPE.MATERIAL] || [];
    const assets = config.assets || [];

    delete config.texture;
    delete config.material;
    delete config.assets;

    // 先删物体
    dataSupportManager.remove(config);
    // 再删材质
    dataSupportManager.remove({ [MODULETYPE.MATERIAL]: material });
    // 再删贴图
    dataSupportManager.remove({ [MODULETYPE.TEXTURE]: texture });
    // 再清空外部资源缓存
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
    config: EngineSupportLoadOptions
  ): Promise<MappedEvent | undefined> {
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
        resolve(undefined);
      }
    });
  }

  removeConfig(config: EngineSupportLoadOptions) {
    this.removeLifeCycle(config);
  }

  getObjectConfig<O, C extends SymbolConfig>(object: O): C | null {
    const symbol = this.getObjectSymbol(object);

    if (symbol) {
      return this.getConfigBySymbol(symbol) as C | null;
    } else {
      return null;
    }
  }

  registModule<C extends Compiler<any, any>>(options: ModuleOptions<C>): this {
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

    return this;
  }
}

export interface EngineSupportOptions extends EngineOptions {
  modules: ModuleOptions<any>[];
}

export const defineEngineSupport = function (options: EngineSupportOptions) {
  const engine = new EngineSupport();

  if (options.modules) {
    options.modules.forEach((module) => {
      engine.registModule(module);
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
