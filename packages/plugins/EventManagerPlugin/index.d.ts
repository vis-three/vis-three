import { PointerManagerEngine } from "../PointerManagerPlugin";
import { EventManager } from "./EventManager";
import { Plugin } from "@vis-three/core";
export * from "./EventManager";
export interface EventManagerEngine extends PointerManagerEngine {
    eventManager: EventManager;
}
export declare const EventManagerPlugin: Plugin<EventManagerEngine>;
