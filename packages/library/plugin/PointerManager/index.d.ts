import { Engine, Plugin } from "@vis-three/core";
import { PointerManager, PointerManagerParameters } from "./PointerManager";
export * from "./PointerManager";
export interface PointerManagerEngine extends Engine {
    /**指针管理器 */
    pointerManager: PointerManager;
}
export declare const POINTER_MANAGER_PLUGIN: string;
export declare const PointerManagerPlugin: Plugin<PointerManagerEngine, PointerManagerParameters>;
