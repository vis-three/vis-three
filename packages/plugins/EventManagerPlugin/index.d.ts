import { PointerManagerEngine } from "../PointerManagerPlugin";
import { EventManager } from "./EventManager";
import { Plugin } from "@vis-three/core";
export * from "./EventManager";
export declare const EVENT_MANAGER_PLUGIN: string;
export interface EventManagerEngine extends PointerManagerEngine {
    eventManager: EventManager;
}
export declare const EventManagerPlugin: Plugin<EventManagerEngine>;
