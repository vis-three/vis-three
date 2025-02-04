import { Engine, EngineOptions } from "@vis-three/core";
import { LoaderManager, LoaderManagerParameters, LoadUnit } from "@vis-three/plugin-loader-manager";
import { PointerManager, PointerManagerEngine, PointerManagerParameters } from "@vis-three/plugin-pointer-manager";
import { EventManager, EventManagerEngine, EventManagerParameters } from "@vis-three/plugin-event-manager";
import { RenderManager, RenderManagerEngine, RenderManagerPluginParams } from "@vis-three/plugin-render-manager";
import { DataSupportEngine, DataSupportManager, DataSupportPluginParameters, LoadOptions } from "../plugin/DataSupportManagerPlugin";
import { MappedEvent, ResourceManager, ResourceManagerEngine, ResourceManagerPluginParameters } from "../plugin/ResourceManagerPlugin";
import { BasicConfig } from "../module/common";
import { LoaderMappingEngine } from "../strategy/LoaderMappingStrategy";
import { CompilerManager, CompilerManagerEngine, CompilerManagerPluginParameters } from "../plugin/CompilerManagerPlugin";
import { ModuleOptions } from "../module";
import { Object3D, Object3DEventMap } from "three";
import { Trigger } from "../trigger";
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
export declare enum SUPPORT_LIFE_CYCLE {
    ZERO = 0,
    ONE = 100,
    TWO = 200,
    THREE = 300,
    FOUR = 400,
    FIVE = 500,
    SIX = 600,
    SEVEN = 700,
    EIGHT = 800,
    NINE = 900
}
export declare class EngineSupport extends Engine implements PointerManagerEngine, EventManagerEngine, RenderManagerEngine, DataSupportEngine, CompilerManagerEngine, LoaderMappingEngine {
    loaderManager: LoaderManager;
    eventManager: EventManager;
    renderManager: RenderManager;
    play: () => void;
    stop: () => void;
    render: (delta?: number) => this;
    pointerManager: PointerManager;
    resourceManager: ResourceManager;
    registerResources: (resourceMap: Record<string, unknown>) => ResourceManagerEngine;
    dataSupportManager: DataSupportManager;
    applyConfig: (...args: BasicConfig[]) => DataSupportEngine;
    removeConfigBySymbol: (...args: string[]) => DataSupportEngine;
    toJSON: () => string;
    exportConfig: () => LoadOptions;
    compilerManager: CompilerManager;
    getObjectSymbol: (object: any) => string | null;
    getObjectBySymbol: (vid: string) => any;
    loadResources: (urlList: LoadUnit[], callback: (err: Error | undefined, event?: MappedEvent | undefined) => void) => this;
    getConfigBySymbol: <C extends BasicConfig = any>(vid: string) => C | null;
    /**
     * @deprecated use getConfigFromModule
     */
    getConfigfromModule: <C extends BasicConfig = any>(module: string, vid: string) => C | null;
    /**
     * @deprecated use getConfigFromModules
     */
    getConfigfromModules: <C extends BasicConfig = any>(modules: string[] | Record<string, any>, vid: string) => C | null;
    getConfigFromModule: <C extends BasicConfig = any>(module: string, vid: string) => C | null;
    getConfigFromModules: <C extends BasicConfig = any>(modules: string[] | Record<string, any>, vid: string) => C | null;
    /**
     * @deprecated use getObjectFromModule
     */
    getObjectfromModule: <O = any>(module: string, vid: string) => O | null;
    /**
     * @deprecated use getObjectFromModules
     */
    getObjectfromModules: <O = any>(modules: string[] | Record<string, any>, vid: string) => O | null;
    getObjectFromModule: <O = any>(module: string, vid: string) => O | null;
    getObjectFromModules: <O = any>(modules: string[] | Record<string, any>, vid: string) => O | null;
    getObject3D: <O extends Object3D<Object3DEventMap> = Object3D<Object3DEventMap>>(vid: string) => O | null;
    loadResourcesAsync: (urlList: LoadUnit[]) => Promise<MappedEvent>;
    private moduleLifeCycle;
    private triggers;
    private modulers;
    constructor(params?: Partial<EngineSupportParameters>);
    /**
     * 导入配置的生命周期执行方法
     * @param config 配置
     */
    private loadLifeCycle;
    /**
     * 移除配置时的生命周期执行方法
     * @param config 配置
     */
    private removeLifeCycle;
    /**
     * 加载一个配置
     * @param config 配置单
     * @param callback 加载完成后的回调
     * @returns this
     */
    loadConfig(config: EngineSupportLoadOptions, callback?: (event?: MappedEvent) => void): this;
    /**
     * 异步的加载一个配置
     * @param config 配置单
     * @param pretreat 配置单预处理
     * @returns Promise<MappedEvent>
     */
    loadConfigAsync(config: EngineSupportLoadOptions, pretreat?: (c: EngineSupportLoadOptions) => EngineSupportLoadOptions): Promise<MappedEvent>;
    /**
     * 移除一个配置单
     * @param config 配置单
     */
    removeConfig(config: EngineSupportLoadOptions): void;
    /**
     * 获取一个对象的配置结构
     * @param object 物体对象
     * @returns 配置 | null
     */
    getObjectConfig<O, C extends BasicConfig>(object: O): C | null;
    /**
     * 使用一个配置化模块
     * @param options 配置化模块选项
     * @returns this
     */
    useModule(options: ModuleOptions<any, any>): this;
    /**
     * 添加一个触发器
     * @param name 触发器名称或者标识
     * @param trigger 触发器对象
     * @returns this
     */
    addTrigger(name: string, trigger: Trigger): this;
    /**
     * 获取一个触发器
     * @param name 触发器名称
     * @returns Trigger
     */
    getTrigger(name: string): Trigger | null;
    /**
     * 引擎的初始化，如果定义的模型存在外部资源需要手动调用此api。
     */
    init(): Promise<void>;
    /**
     * @deprecated
     * use useModule
     */
    registModule(options: ModuleOptions): this;
}
export interface EngineSupportOptions extends EngineOptions {
    modules: ModuleOptions<any>[];
}
/**
 * 定义一个配置化引擎
 * @param options 定义引擎的选项
 * @param params 引擎的参数
 * @returns engine extends EngineSupport
 */
export declare const defineEngineSupport: <E extends EngineSupport = EngineSupport>(options: EngineSupportOptions, params?: Partial<EngineSupportParameters>) => E;
