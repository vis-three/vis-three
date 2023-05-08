import { Strategy } from "@vis-three/core";
import { RenderManagerEngine } from "@vis-three/render-manager-plugin";
import { KeyboardMoveControlsEngine } from "@vis-three/keyboard-move-controls-plugin";
export interface KeyboardMoveRenderEngine extends KeyboardMoveControlsEngine, RenderManagerEngine {
}
export declare const name: string;
export declare const KeyboardMoveRenderStrategy: Strategy<KeyboardMoveRenderEngine>;
