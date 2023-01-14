import { Strategy } from "@vis-three/core";
import { EventManagerEngine } from "@vis-three/event-manager-plugin";
import { ObjectHelperEngine } from "@vis-three/object-helper-plugin";
import { SelectionEngine } from "@vis-three/selection-plugin";
import { TransformControlsEngine } from "@vis-three/transform-controls-plugin";
export interface HelperSelectInteractEngine extends EventManagerEngine, ObjectHelperEngine, SelectionEngine, TransformControlsEngine {
}
export declare const HELPER_SELECT_INTERACT_STRATEGY: string;
export interface HelperSelectInteractParameters {
    interact?: boolean;
    activeColor?: string;
    hoverColor?: string;
    defaultColor?: string;
    selectedColor?: string;
}
export declare const HelperSelectInteractStrategy: Strategy<HelperSelectInteractEngine>;
