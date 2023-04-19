import { Engine, Plugin } from "@vis-three/core";
import { ObjectHelperManager } from "./ObjectHelperManager";
export * from "./ObjectHelperManager";
export interface ObjectHelperEngine extends Engine {
    objectHelperManager: ObjectHelperManager;
    setObjectHelper: (show: boolean) => ObjectHelperEngine;
}
export declare const OBJECT_HELPER_PLUGIN: string;
export declare const ObjectHelperPlugin: Plugin<ObjectHelperEngine>;
