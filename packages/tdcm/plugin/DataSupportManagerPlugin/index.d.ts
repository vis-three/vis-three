import { Engine, Plugin } from "@vis-three/core";
import { SymbolConfig } from "../../module/common";
import { DataSupportManager, LoadOptions } from "./DataSupportManager";
export interface DataSupportEngine extends Engine {
    dataSupportManager: DataSupportManager;
    applyConfig: (...args: SymbolConfig[]) => DataSupportEngine;
    getConfigBySymbol: <C extends SymbolConfig = any>(vid: string) => C | null;
    removeConfigBySymbol: (...args: string[]) => DataSupportEngine;
    getConfigfromModule: <C extends SymbolConfig = any>(module: string, vid: string) => C | null;
    getConfigfromModules: <C extends SymbolConfig = any>(modules: string[] | Record<string, any>, vid: string) => C | null;
    toJSON: () => string;
    exportConfig: () => LoadOptions;
}
export interface DataSupportPluginParameters {
}
export * from "./DataSupportManager";
export declare const DATA_SUPPORT_MANAGER_PLUGIN = "DataSupportManagerPlugin";
export declare const DataSupportManagerPlugin: Plugin<DataSupportEngine, DataSupportPluginParameters>;
