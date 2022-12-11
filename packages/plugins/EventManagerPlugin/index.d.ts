import { Plugin } from "../plugin";
import { PointerManagerEngine } from "../PointerManagerPlugin";
import { EventManager } from "./EventManager";
export interface EventManagerEngine extends PointerManagerEngine {
    eventManager: EventManager;
}
declare const EventManagerPlugin: Plugin<EventManagerEngine>;
export default EventManagerPlugin;
