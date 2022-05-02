import { EngineSupport } from "../../engine/EngineSupport";
import { ObjectEvent } from "../../manager/EventManager";
export interface BasicEventConfig {
    name: string;
}
export declare type EventGenerator<C extends BasicEventConfig> = (engine: EngineSupport, config: C) => (event?: ObjectEvent) => void;
export declare class EventLibrary {
    getConfig(name: string): void;
    generateEvent(config: object): void;
}
