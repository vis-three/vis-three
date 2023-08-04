import { Engine, EngineOptions } from "@vis-three/core";
import { LoaderManager, LoadUnit } from "@vis-three/plugin-loader-manager";
import { PointerManager, PointerManagerEngine } from "@vis-three/plugin-pointer-manager";
import { EventManager, EventManagerEngine } from "@vis-three/plugin-event-manager";
import { RenderManager, RenderManagerEngine } from "@vis-three/plugin-render-manager";
import { DataSupportEngine, DataSupportManager, LoadOptions } from "../plugin/DataSupportManagerPlugin";
import { MappedEvent, ResourceManager, ResourceManagerEngine } from "../plugin/ResourceManagerPlugin";
import { SymbolConfig } from "../module/common";
import { LoaderMappingEngine } from "../strategy/LoaderMappingStrategy";
import { CompilerManager, CompilerManagerEngine } from "../plugin/CompilerManagerPlugin";
import { Compiler, ModuleOptions } from "../module";
import { Object3D, Event } from "three";
export type EngineSupportLoadOptions = LoadOptions & {
    assets?: string[];
};
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
    render: (delta: number) => this;
    pointerManager: PointerManager;
    resourceManager: ResourceManager;
    registerResources: (resourceMap: Record<string, unknown>) => ResourceManagerEngine;
    dataSupportManager: DataSupportManager;
    applyConfig: (...args: SymbolConfig[]) => DataSupportEngine;
    getConfigBySymbol: (vid: string) => SymbolConfig | null;
    removeConfigBySymbol: (...args: string[]) => DataSupportEngine;
    toJSON: () => string;
    exportConfig: () => LoadOptions;
    compilerManager: CompilerManager;
    getObjectSymbol: (object: any) => string | null;
    getObjectBySymbol: (vid: string) => any;
    loadResources: (urlList: LoadUnit[], callback: (err: Error | undefined, event?: MappedEvent | undefined) => void) => this;
    loadResourcesAsync: (urlList: LoadUnit[]) => Promise<MappedEvent>;
    getObjectfromModule: (module: string, vid: string) => object | null;
    getObjectfromModules: (modules: string[] | Record<string, any>, vid: string) => object | null;
    getObject3D: (vid: string) => Object3D<Event> | null;
    private moduleLifeCycle;
    private moduleTriggers;
    private processorExpands;
    constructor();
    private loadLifeCycle;
    private removeLifeCycle;
    loadConfig(config: EngineSupportLoadOptions, callback?: (event?: MappedEvent) => void): this;
    loadConfigAsync(config: EngineSupportLoadOptions, pretreat: (c: EngineSupportLoadOptions) => EngineSupportLoadOptions): Promise<MappedEvent>;
    removeConfig(config: EngineSupportLoadOptions): void;
    getObjectConfig<O, C extends SymbolConfig>(object: O): C | null;
    registModule<C extends Compiler<any, any>>(options: ModuleOptions<C>): this;
}
export interface EngineSupportOptions extends EngineOptions {
    modules: ModuleOptions<any>[];
}
export declare const defineEngineSupport: (options: EngineSupportOptions) => EngineSupport;
