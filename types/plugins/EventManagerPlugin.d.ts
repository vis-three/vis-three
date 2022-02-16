import { EventManagerParameters, GlobalEvent } from "../manager/EventManager";
import { Plugin } from "./plugin";
import { SymbolConfig } from '../middleware/common/CommonConfig';
export interface GlobalSupportEvent extends GlobalEvent {
    vidList: Array<SymbolConfig['vid'] | null>;
}
export declare const EventManagerPlugin: Plugin<EventManagerParameters>;
export declare const EventManagerSupportPlugin: Plugin<EventManagerParameters>;
