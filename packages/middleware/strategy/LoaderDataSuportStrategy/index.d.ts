import { Strategy } from "@vis-three/core";
import { LoaderManagerEngine } from "@vis-three/plugin-loader-manager";
import { DataSupportEngine } from "../../plugin/DataSupportManagerPlugin";
export interface LoaderDataSupportEngine extends DataSupportEngine, LoaderManagerEngine {
}
export declare const LOADER_DATA_SUPPORT_STRATEGY = "LoaderDataSupportStrategy";
export declare const LoaderDataSupportStrategy: Strategy<LoaderDataSupportEngine, object>;
