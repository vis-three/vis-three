import { Engine, Plugin } from "@vis-three/core";
import { KeyboardEntity, KeyboardManager } from "./KeyboardManager";
export * from "./KeyboardManager";
export interface KeyboardManagerEngine extends Engine {
    keyboardManager: KeyboardManager;
}
export interface KeyboardParameters {
    /**快捷键设置 */
    keyboards?: Array<KeyboardEntity>;
}
export declare const KEYBOARD_MANAGER_PLUGIN: string;
export declare const KeyboardManagerPlugin: Plugin<KeyboardManagerEngine, KeyboardParameters>;
