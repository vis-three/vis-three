import { EventDispatcher } from "@vis-three/core";
import { BasicConfig } from "../../module";
import { Converter } from "../../module";
export type LoadOptions = Record<string, Array<any>>;
export declare class DataSupportManager extends EventDispatcher {
    dataSupportMap: Map<string, Converter<any, any>>;
    constructor();
    /**
     * 转换器拓展
     * @param dataSupport 转换器
     * @param focus 是否强制覆盖
     */
    extend(dataSupport: Converter<any, any>, focus?: boolean): void;
    /**
     * 获取该模块下的转换器
     * @param type MODULETYPE
     * @returns Converter
     */
    getDataSupport<D>(type: string): D | null;
    /**
     * 通过vid标识获取相应配置对象
     * @param vid vid标识
     * @returns config || null
     */
    getConfigBySymbol<T extends BasicConfig>(vid: string): T | null;
    /**
     * @deprecated use getConfigFromModule
     * @param module
     * @param vid
     * @returns
     */
    getConfigfromModule<T extends BasicConfig>(module: string, vid: string): T | null;
    /**
     * 从一个模块中通过vid标识获取配置
     * @param module 模块类型
     * @param vid vid标识
     * @returns 配置
     */
    getConfigFromModule<T extends BasicConfig>(module: string, vid: string): T | null;
    /**
     * @deprecated use getConfigFromModules
     * @param modules
     * @param vid
     * @returns
     */
    getConfigfromModules<T extends BasicConfig>(modules: string[] | Record<string, any>, vid: string): T | null;
    /**
     * 从多个模块中通过vid标识获取配置
     * @param modules 模块类型
     * @param vid vid标识
     * @returns 配置
     */
    getConfigFromModules<T extends BasicConfig>(modules: string[] | Record<string, any>, vid: string): T | null;
    /**
     * 通过vid标识移除相关配置对象
     * @param vid ...vid标识
     * @returns this
     */
    removeConfigBySymbol(...vids: string[]): this;
    /**
     * 通过vid标识获取该标识所处的模块
     * @param vid vid标识
     * @returns MODULETYPE || null
     */
    getModuleBySymbol(vid: string): string | null;
    /**
     * 应用配置对象
     * @param config vis相关配置对象
     * @returns this
     */
    applyConfig<T extends BasicConfig>(...configs: T[]): this;
    /**
     * 根据配置单加载对象
     * @param config 符合vis配置选项的配置单对象
     * @returns this
     */
    load(config: LoadOptions): this;
    /**
     * 根据模块加载配置
     * @param config
     * @param module
     * @returns
     */
    loadByModule(config: BasicConfig[], module: string): this;
    /**
     * 根据配置单移除相关对象
     * @param config  符合vis配置选项的配置单对象
     * @returns this
     */
    remove(config: LoadOptions): this;
    /**
     * 获取JSON化的配置单
     * @param extendsConfig 需要额外JSON化的配置对象，会被dataSupport的对象覆盖
     * @param compress 是否压缩配置单 default true
     * @returns JSON string
     */
    toJSON(extendsConfig?: Record<string, Array<any>>, compress?: boolean): string;
    /**
     * 导出配置单
     * @param extendsConfig 拓展配置对象
     * @param compress 是否压缩配置单 default true
     * @returns LoadOptions
     */
    exportConfig(extendsConfig?: Record<string, Array<any>>, compress?: boolean): LoadOptions;
}
