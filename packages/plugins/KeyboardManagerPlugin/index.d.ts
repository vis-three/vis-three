import { Engine, Plugin } from "@vis-three/core";
import { KeyboardManager } from "./KeyboardManager";
export * from "./KeyboardManager";
export interface KeyboardManagerEngine extends Engine {
    keyboardManager: KeyboardManager;
}
export declare const KEYBOARD_MANAGER_PLUGIN: string;
export declare const KeyboardManagerPlugin: Plugin<KeyboardManagerEngine>;
