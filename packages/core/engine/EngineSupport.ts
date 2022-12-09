import { MODULETYPE, SymbolConfig } from "@vis-three/middleware";
import CompilerManagerPlugin, {
  CompilerManagerEngine,
} from "../plugin/CompilerManagerPlugin";
import { CompilerManager } from "../plugin/CompilerManagerPlugin/CompilerManager";
import DataSupportManagerPlugin, {
  DataSupportEngine,
} from "../plugin/DataSupportManagerPlugin";
import {
  DataSupportManager,
  DataSupportManagerParameters,
  LoadOptions,
} from "../plugin/DataSupportManagerPlugin/DataSupportManager";
import EventManagerPlugin, {
  EventManagerEngine,
} from "../plugin/EventManagerPlugin";
import { EventManager } from "../plugin/EventManagerPlugin/EventManager";
import LoaderManagerPlugin, {
  LoaderMappingEngine,
} from "../plugin/LoaderManagerPlugin";
import {
  LoaderManager,
  LoadUnit,
} from "../plugin/LoaderManagerPlugin/LoaderManager";
import PointerManagerPlugin, {
  PointerManagerEngine,
} from "../plugin/PointerManagerPlugin";
import { PointerManager } from "../plugin/PointerManagerPlugin/PointerManager";
import RenderManagerPlugin, {
  RenderManagerEngine,
} from "../plugin/RenderManagerPlugin";
import { RenderManager } from "../plugin/RenderManagerPlugin/RenderManager";
import ResourceManagerPlugin, {
  ResourceManagerEngine,
} from "../plugin/ResourceManagerPlugin";
import {
  MappedEvent,
  ResourceManager,
} from "../plugin/ResourceManagerPlugin/ResourceManager";
import { Engine } from "./Engine";

export type EngineSupportParameters = DataSupportManagerParameters;

export interface EngineSupportLoadOptions extends LoadOptions {
  assets?: string[];
}

export class EngineSupport
  extends Engine
  implements
    LoaderMappingEngine,
    PointerManagerEngine,
    EventManagerEngine,
    RenderManagerEngine,
    DataSupportEngine,
    CompilerManagerEngine
{
  declare loaderManager: LoaderManager;
  declare loadResources: (
    urlList: LoadUnit[],
    callback: (err: Error | undefined, event?: MappedEvent | undefined) => void
  ) => LoaderMappingEngine;
  declare loadResourcesAsync: (urlList: LoadUnit[]) => Promise<MappedEvent>;
  declare resourceManager: ResourceManager;
  declare registerResources: (
    resourceMap: Record<string, unknown>
  ) => ResourceManagerEngine;
  declare renderManager: RenderManager;
  declare pointerManager: PointerManager;
  declare compilerManager: CompilerManager;
  declare getObjectSymbol: (object: any) => string | null;
  declare getObjectBySymbol: (vid: string) => any;
  declare dataSupportManager: DataSupportManager;
  declare applyConfig: (...args: SymbolConfig[]) => DataSupportEngine;
  declare getConfigBySymbol: (vid: string) => SymbolConfig | null;
  declare removeConfigBySymbol: (...args: string[]) => DataSupportEngine;
  declare toJSON: () => string;
  declare exportConfig: () => LoadOptions;
  declare eventManager: EventManager;

  constructor(
    parameters: EngineSupportParameters = {},
    resources: { [key: string]: any } = {}
  ) {
    super();
    this.install(LoaderManagerPlugin())
      .install(ResourceManagerPlugin({ resources }))
      .install(PointerManagerPlugin())
      .install(EventManagerPlugin())
      .install(RenderManagerPlugin())
      .install(DataSupportManagerPlugin(parameters))
      .install(CompilerManagerPlugin());
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
    const renderFlag = this.renderManager!.hasRendering();

    if (renderFlag) {
      this.renderManager!.stop();
    }

    // 导入外部资源
    if (config.assets && config.assets.length) {
      const mappedFun = (event: MappedEvent) => {
        delete config.assets;
        this.loadLifeCycle(config);

        this.resourceManager.removeEventListener("mapped", mappedFun);
        callback && callback(event);
        if (renderFlag) {
          this.renderManager!.play();
        } else {
          this.renderManager!.render();
        }
      };

      this.resourceManager.addEventListener<MappedEvent>("mapped", mappedFun);
      this.loaderManager.reset().load(config.assets);
    } else {
      this.loadLifeCycle(config);
      callback && callback();

      if (renderFlag) {
        this.renderManager!.play();
      } else {
        this.renderManager!.render();
      }
    }

    return this;
  }

  loadConfigAsync(
    config: EngineSupportLoadOptions
  ): Promise<MappedEvent | undefined> {
    return new Promise((resolve, reject) => {
      const renderFlag = this.renderManager!.hasRendering();

      if (renderFlag) {
        this.renderManager!.stop();
      }
      // 导入外部资源
      if (config.assets && config.assets.length) {
        const mappedFun = (event: MappedEvent) => {
          delete config.assets;
          this.loadLifeCycle(config);

          this.resourceManager.removeEventListener("mapped", mappedFun);
          if (renderFlag) {
            this.renderManager!.play();
          } else {
            this.renderManager!.render();
          }
          resolve(event);
        };

        this.resourceManager.addEventListener<MappedEvent>("mapped", mappedFun);
        this.loaderManager.reset().load(config.assets);
      } else {
        this.loadLifeCycle(config);
        if (renderFlag) {
          this.renderManager!.play();
        } else {
          this.renderManager!.render();
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
}
