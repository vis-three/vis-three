import { ObjectEvent } from "@vis-three/plugin-event-manager";
import { EngineSupport } from "../engine";
export interface BasicEventConfig {
    name: string | Symbol;
}
export type EventGenerator<C extends BasicEventConfig = BasicEventConfig, E extends EngineSupport = EngineSupport> = (engine: E, config: C) => (event?: ObjectEvent) => void;
export declare class EventGeneratorManager {
    private static configLibrary;
    private static generatorLibrary;
    static register: <C extends BasicEventConfig>({ config, generator, }: {
        config: C;
        generator: EventGenerator<C, EngineSupport>;
    }) => EventGeneratorManager;
    static generateConfig(name: string, merge: object): BasicEventConfig;
    static generateEvent(config: BasicEventConfig, engine: EngineSupport): (event?: ObjectEvent) => void;
    static has(name: string): boolean;
}
