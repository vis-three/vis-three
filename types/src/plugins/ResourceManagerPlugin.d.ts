import { Plugin } from "./plugin";
export interface ResourceManagerPluginParameters {
    resources: {
        [key: string]: any;
    };
}
export declare const ResourceManagerPlugin: Plugin<ResourceManagerPluginParameters>;
