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
    constructor(params?: Partial<EngineSupportParameters>);
    private loadLifeCycle;
    private removeLifeCycle;
    loadConfig(config: EngineSupportLoadOptions, callback?: (event?: MappedEvent) => void): this;
    loadConfigAsync(config: EngineSupportLoadOptions, pretreat?: (c: EngineSupportLoadOptions) => EngineSupportLoadOptions): Promise<MappedEvent>;
    removeConfig(config: EngineSupportLoadOptions): void;
    getObjectConfig<O, C extends BasicConfig>(object: O): C | null;
    useModule(options: ModuleOptions<any, any>): this;
    addTrigger(name: string, trigger: Trigger): this;
    getTrigger(name: string): Trigger | null;
    init(): void;
    /**
     * @deprecated
     * use useModule
     */
    registModule(options: ModuleOptions): this;
}
export interface EngineSupportOptions extends EngineOptions {
    modules: ModuleOptions<any>[];
}
export declare const defineEngineSupport: <E extends EngineSupport = EngineSupport>(options: EngineSupportOptions, params?: Partial<EngineSupportParameters>) => E;
