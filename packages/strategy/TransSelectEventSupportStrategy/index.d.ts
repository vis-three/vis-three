import { Strategy } from "@vis-three/core";
import { EventManagerEngine } from "@vis-three/event-manager-plugin";
import { TransformControlsEngine } from "@vis-three/transform-controls-plugin";
import { EngineSupport } from "@vis-three/middleware";
import { SelectionSupportEngine } from "@vis-three/selection-support-plugin";
export interface TransSelectEventSupportEngine extends SelectionSupportEngine, EventManagerEngine, TransformControlsEngine, EngineSupport {
}
export declare const name: string;
export declare const TransSelectEventSupportStrategy: Strategy<TransSelectEventSupportEngine>;
