import { EventDispatcher } from "@vis-three/core";
import { getModule, BasicConfig } from "../../module";
import { Converter } from "../../module";
import { JSONHandler } from "../../utils";

export type LoadOptions = Record<string, Array<any>>;

export class DataSupportManager extends EventDispatcher {
  dataSupportMap: Map<string, Converter<any, any>> = new Map();

  constructor() {
    super();
  }

  /**
   * 编译器扩展
   * @param compiler
   */
  extend(dataSupport: Converter<any, any>, focus: boolean = false) {
    if (this.dataSupportMap.has(dataSupport.MODULE)) {
      console.warn(
        "dataSupport manager has exist this dataSupport",
        dataSupport
      );

      if (focus) {
        this.dataSupportMap.set(dataSupport.MODULE, dataSupport);
      }
    } else {
      this.dataSupportMap.set(dataSupport.MODULE, dataSupport);
    }
  }

  /**
   * 获取该模块下的支持插件
   * @param type MODULETYPE
   * @returns Converter
   */
  getDataSupport<D>(type: string): D | null {
    if (this.dataSupportMap.has(type)) {
      return this.dataSupportMap.get(type)! as unknown as D;
    } else {
      console.warn(`can not found this type in dataSupportManager: ${type}`);
      return null;
    }
  }

  /**
   * 通过vid标识获取相应配置对象
   * @param vid vid标识
   * @returns config || null
   */
  getConfigBySymbol<T extends BasicConfig>(vid: string): T | null {
    const dataSupportList = this.dataSupportMap.values();

    for (const dataSupport of dataSupportList) {
      const config = dataSupport.getConfig(vid) as T;
      if (config) {
        return config;
      }
    }

    return null;
  }

  /**
   * @deprecated use getConfigFromModule
   * @param module
   * @param vid
   * @returns
   */
  getConfigfromModule<T extends BasicConfig>(
    module: string,
    vid: string
  ): T | null {
    return this.getConfigFromModule<T>(module, vid);
  }

  getConfigFromModule<T extends BasicConfig>(
    module: string,
    vid: string
  ): T | null {
    if (!this.dataSupportMap.has(module)) {
      console.warn(`data support manager can not found this module: ${module}`);
      return null;
    }

    const dataSupport = this.dataSupportMap.get(module)!;
    return (dataSupport.getConfig(vid) as T) || null;
  }

  /**
   * @deprecated use getConfigFromModules
   * @param modules
   * @param vid
   * @returns
   */
  getConfigfromModules<T extends BasicConfig>(
    modules: string[] | Record<string, any>,
    vid: string
  ) {
    return this.getConfigFromModules<T>(modules, vid);
  }

  getConfigFromModules<T extends BasicConfig>(
    modules: string[] | Record<string, any>,
    vid: string
  ) {
    if (!Array.isArray(modules)) {
      modules = Object.keys(modules);
    }

    for (const module of modules as string[]) {
      if (!this.dataSupportMap.has(module)) {
        console.warn(
          `data support manager can not found this module: ${module}`
        );
        continue;
      }

      const dataSupport = this.dataSupportMap.get(module)!;
      const config = dataSupport.getConfig(vid) as T;

      if (config) {
        return config;
      }
    }

    return null;
  }

  /**
   * 通过vid标识移除相关配置对象
   * @param vid ...vid标识
   * @returns this
   */
  removeConfigBySymbol(...vids: string[]): this {
    for (const vid of vids) {
      for (const dataSupport of this.dataSupportMap.values()) {
        if (dataSupport.existSymbol(vid)) {
          dataSupport.removeConfig(vid);
          break;
        }
      }
    }

    return this;
  }

  /**
   * 通过vid标识获取该标识所处的模块
   * @param vid vid标识
   * @returns MODULETYPE || null
   */
  getModuleBySymbol(vid: string): string | null {
    const dataSupportList = this.dataSupportMap.values();

    for (const dataSupport of dataSupportList) {
      if (dataSupport.existSymbol(vid)) {
        return dataSupport.MODULE;
      }
    }

    return null;
  }

  /**
   * 应用配置对象
   * @param config vis相关配置对象
   * @returns this
   */
  applyConfig<T extends BasicConfig>(...configs: T[]): this {
    for (const config of configs) {
      const module = getModule(config.type);

      if (module) {
        this.dataSupportMap.get(module)!.addConfig(config);
      } else {
        console.warn(
          `dataSupportManager can not found this config module: ${config.type}`
        );
      }
    }

    return this;
  }

  /**
   * 根据配置单加载对象
   * @param config 符合vis配置选项的配置单对象
   * @returns this
   */
  load(config: LoadOptions): this {
    const dataSupportMap = this.dataSupportMap;
    dataSupportMap.forEach((dataSupport, module) => {
      config[module] && dataSupport.load(config[module]!);
    });
    return this;
  }

  /**
   * 根据模块加载配置
   * @param config
   * @param module
   * @returns
   */
  loadByModule(config: BasicConfig[], module: string): this {
    const dataSupport = this.dataSupportMap.get(module);

    if (!dataSupport) {
      console.warn(`DataSupportManager can not support this module: ${module}`);
      return this;
    }

    dataSupport.load(config);
    return this;
  }

  /**
   * 根据配置单移除相关对象
   * @param config  符合vis配置选项的配置单对象
   * @returns this
   */
  remove(config: LoadOptions): this {
    const dataSupportMap = this.dataSupportMap;
    dataSupportMap.forEach((dataSupport, module) => {
      config[module] && dataSupport.remove(config[module]!);
    });
    return this;
  }

  /**
   * 获取JSON化的配置单
   * @param extendsConfig 需要额外JSON化的配置对象，会被dataSupport的对象覆盖
   * @param compress 是否压缩配置单 default true
   * @returns JSON string
   */
  toJSON(
    extendsConfig: Record<string, Array<any>> = {},
    compress = true
  ): string {
    return JSON.stringify(
      this.exportConfig(extendsConfig, compress),
      JSONHandler.stringify
    );
  }

  /**
   * 导出配置单
   * @param extendsConfig 拓展配置对象
   * @param compress 是否压缩配置单 default true
   * @returns LoadOptions
   */
  exportConfig(
    extendsConfig: Record<string, Array<any>> = {},
    compress = true
  ): LoadOptions {
    const dataSupportMap = this.dataSupportMap;
    dataSupportMap.forEach((dataSupport, module) => {
      extendsConfig[module] = dataSupport.exportConfig(compress);
    });
    return extendsConfig;
  }
}
