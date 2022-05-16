import { Object3D } from "three";
import { CompilerManager } from "../manager/CompilerManager";
import {
  DataSupportManager,
  DataSupportManagerParameters,
  LoadOptions,
} from "../manager/DataSupportManager";
import { LoaderManager } from "../manager/LoaderManager";
import { MappedEvent, ResourceManager } from "../manager/ResourceManager";
import { SymbolConfig } from "../middleware/common/CommonConfig";
import { MODULETYPE } from "../middleware/constants/MODULETYPE";
import { Engine, ENGINEPLUGIN } from "./Engine";

export type EngineSupportParameters = DataSupportManagerParameters;

export interface EngineSupportLoadOptions extends LoadOptions {
  assets?: string[];
}

export class EngineSupport extends Engine {
  IS_ENGINESUPPORT = true;

  declare loaderManager: LoaderManager;
  declare resourceManager: ResourceManager;
  declare dataSupportManager: DataSupportManager;
  declare compilerManager: CompilerManager;

  declare loadResources: (urlList: Array<string>) => this;
  declare registerResources: (resourceMap: { [key: string]: unknown }) => this;
  declare toJSON: () => string;

  declare exportConfig: (compress: boolean) => LoadOptions;

  declare applyConfig: <T extends SymbolConfig>(...configs: T[]) => this;
  declare reactiveConfig: <T extends SymbolConfig>(config: T) => T;
  declare getConfigBySymbol: <T extends SymbolConfig>(vid: string) => T | null;
  declare removeConfigBySymbol: (vid: string) => this;

  declare getObjectSymbol: <O extends Object3D>(
    object: O
  ) => SymbolConfig["vid"] | null;
  declare getObjectBySymbol: (vid: string) => Object3D | null;

  constructor(parameters?: EngineSupportParameters) {
    super();
    this.install(ENGINEPLUGIN.LOADERMANAGER)
      .install(ENGINEPLUGIN.RESOURCEMANAGER)
      .install(ENGINEPLUGIN.POINTERMANAGER)
      .install(ENGINEPLUGIN.EVENTMANAGER)
      .install(ENGINEPLUGIN.RENDERMANAGER)
      .install(ENGINEPLUGIN.DATASUPPORTMANAGER, parameters)
      .install(ENGINEPLUGIN.COMPILERMANAGER);
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
    const texture = config[MODULETYPE.TEXTURE] || {};
    const material = config[MODULETYPE.MATERIAL] || {};
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
}
