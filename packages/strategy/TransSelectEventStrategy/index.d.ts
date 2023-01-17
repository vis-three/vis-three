import { Strategy } from "@vis-three/core";
import { SelectionEngine } from "@vis-three/selection-plugin";
import { EventManagerEngine } from "@vis-three/event-manager-plugin";
import { TransformControlsEngine } from "@vis-three/transform-controls-plugin";
export interface TransSelectEventEngine extends SelectionEngine, EventManagerEngine, TransformControlsEngine {
}
export declare const name: string;
export declare const TransSelectEventStrategy: Strategy<TransSelectEventEngine>;
