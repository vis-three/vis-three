import { ObjectEvent } from "@vis-three/plugin-event-manager";
import { EngineSupport } from "../engine";
export interface BasicEventConfig {
    name: string | Symbol;
}
export type EventGenerator<C extends BasicEventConfig> = (engine: EngineSupport, config: C) => (event?: ObjectEvent) => void;
export declare class EventGeneratorManager {
    private static configLibrary;
    private static generatorLibrary;
    static register: <C extends BasicEventConfig>({ config, generator, }: {
        config: C;
        generator: EventGenerator<C>;
    }) => EventGeneratorManager;
    static generateConfig(name: string, merge: object): BasicEventConfig;
    static generateEvent(config: BasicEventConfig, engine: EngineSupport): (event?: ObjectEvent) => void;
    static has(name: string): boolean;
}
