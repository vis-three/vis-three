import { ObjectEvent } from "@vis-three/plugin-event-manager";
import { EngineSupport } from "@vis-three/tdcm";
import { DeepPartial } from "@vis-three/utils";
export interface BasicEventConfig {
    name: string | Symbol;
}
export type EventGenerator<C extends BasicEventConfig = BasicEventConfig, E extends EngineSupport = EngineSupport> = (engine: E, config: C) => (event?: ObjectEvent) => void;
export declare class EventGeneratorManager {
    private static engine;
    private static configLibrary;
    private static generatorLibrary;
    static register: <C extends BasicEventConfig>({ config, generator, }: {
        config: C;
        generator: EventGenerator<C>;
    }) => EventGeneratorManager;
    static generateConfig<C extends BasicEventConfig = BasicEventConfig>(name: string, merge: DeepPartial<C>): C | null;
    static generateEvent(config: BasicEventConfig, engine: EngineSupport): (event?: ObjectEvent) => void;
    static has(name: string): boolean;
    static useEngine(engine: EngineSupport): void;
    static createEvent<C extends BasicEventConfig = BasicEventConfig>(name: string, merge: DeepPartial<C>, engine?: EngineSupport): ((event?: ObjectEvent | undefined) => void) | null;
}
