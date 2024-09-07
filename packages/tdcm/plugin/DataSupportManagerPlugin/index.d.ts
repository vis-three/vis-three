import { Engine, Plugin } from "@vis-three/core";
import { BasicConfig } from "../../module/common";
import { DataSupportManager, LoadOptions } from "./DataSupportManager";
export interface DataSupportEngine extends Engine {
    dataSupportManager: DataSupportManager;
    applyConfig: (...args: BasicConfig[]) => DataSupportEngine;
    getConfigBySymbol: <C extends BasicConfig = any>(vid: string) => C | null;
    removeConfigBySymbol: (...args: string[]) => DataSupportEngine;
    getConfigfromModule: <C extends BasicConfig = any>(module: string, vid: string) => C | null;
    getConfigfromModules: <C extends BasicConfig = any>(modules: string[] | Record<string, any>, vid: string) => C | null;
    toJSON: () => string;
    exportConfig: () => LoadOptions;
}
export interface DataSupportPluginParameters {
}
export * from "./DataSupportManager";
export declare const DATA_SUPPORT_MANAGER_PLUGIN = "DataSupportManagerPlugin";
export declare const DataSupportManagerPlugin: Plugin<DataSupportEngine, DataSupportPluginParameters>;
