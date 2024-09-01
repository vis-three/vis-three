import { Strategy } from "@vis-three/core";
import { EventManagerEngine } from "@vis-three/plugin-event-manager";
import { TransformControlsEngine } from "@vis-three/plugin-transform-controls";
import { EngineSupport } from "@vis-three/middleware";
import { SelectionSupportEngine } from "@vis-three/plugin-selection-support";
export interface TransSelectEventSupportEngine extends SelectionSupportEngine, EventManagerEngine, TransformControlsEngine, EngineSupport {
}
export declare const name: string;
export declare const TransSelectEventSupportStrategy: Strategy<TransSelectEventSupportEngine, object>;
