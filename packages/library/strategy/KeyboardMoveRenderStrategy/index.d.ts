import { Strategy } from "@vis-three/core";
import { RenderManagerEngine } from "@vis-three/plugin-render-manager";
import { KeyboardMoveControlsEngine } from "@vis-three/plugin-keyboard-move-controls";
export interface KeyboardMoveRenderEngine extends KeyboardMoveControlsEngine, RenderManagerEngine {
}
export declare const name: string;
export declare const KeyboardMoveRenderStrategy: Strategy<KeyboardMoveRenderEngine>;
