import { Strategy } from "@vis-three/core";
import { SelectionEngine } from "@vis-three/plugin-selection";
import { EventManagerEngine } from "@vis-three/plugin-event-manager";
import { TransformControlsEngine } from "@vis-three/plugin-transform-controls";
export interface TransSelectEventEngine extends SelectionEngine, EventManagerEngine, TransformControlsEngine {
}
export declare const name: string;
export declare const TransSelectEventStrategy: Strategy<TransSelectEventEngine>;
