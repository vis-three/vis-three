import { KeyboardManagerEngine } from "@vis-three/keyboard-manager-plugin";
import { TransformControlsEngine } from "@vis-three/transform-controls-plugin";
import { Strategy } from "@vis-three/core";
export interface TransformKeyboardEngine extends KeyboardManagerEngine, TransformControlsEngine {
}
export declare const TRANSFORM_KEYBOARD_STRATEGY: string;
export declare const TransformKeyboardStrategy: Strategy<TransformKeyboardEngine>;
