import { Engine, Plugin } from "@vis-three/core";
import { PointerManager } from "./PointerManager";
export * from "./PointerManager";
export interface PointerManagerEngine extends Engine {
    pointerManager: PointerManager;
}
export declare const PointerManagerPlugin: Plugin<PointerManagerEngine>;
