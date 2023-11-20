import { Engine, Plugin } from "@vis-three/core";
import { SymbolConfig } from "../../module/common";
import { DataSupportManager, LoadOptions } from "./DataSupportManager";
export interface DataSupportEngine extends Engine {
    dataSupportManager: DataSupportManager;
    applyConfig: (...args: SymbolConfig[]) => DataSupportEngine;
    getConfigBySymbol: (vid: string) => SymbolConfig | null;
    removeConfigBySymbol: (...args: string[]) => DataSupportEngine;
    toJSON: () => string;
    exportConfig: () => LoadOptions;
}
export interface DataSupportPluginParameters {
}
export * from "./DataSupportManager";
export declare const DATA_SUPPORT_MANAGER_PLUGIN = "DataSupportManagerPlugin";
export declare const DataSupportManagerPlugin: Plugin<DataSupportEngine, DataSupportPluginParameters>;
