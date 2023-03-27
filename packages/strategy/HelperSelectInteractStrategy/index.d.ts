import { Strategy } from "@vis-three/core";
import { EventManagerEngine } from "@vis-three/plugin-event-manager";
import { ObjectHelperEngine } from "@vis-three/plugin-object-helper";
import { SelectionEngine } from "@vis-three/plugin-selection";
import { TransformControlsEngine } from "@vis-three/plugin-transform-controls";
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
