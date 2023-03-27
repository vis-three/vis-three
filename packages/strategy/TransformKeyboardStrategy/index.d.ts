import { KeyboardManagerEngine } from "@vis-three/plugin-keyboard-manager";
import { TransformControlsEngine } from "@vis-three/plugin-transform-controls";
import { Strategy } from "@vis-three/core";
export interface TransformKeyboardEngine extends KeyboardManagerEngine, TransformControlsEngine {
}
export declare const TRANSFORM_KEYBOARD_STRATEGY: string;
export declare const TransformKeyboardStrategy: Strategy<TransformKeyboardEngine>;
