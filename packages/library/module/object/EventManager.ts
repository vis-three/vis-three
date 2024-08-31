import { ObjectEvent } from "@vis-three/plugin-event-manager";
import { EngineSupport } from "@vis-three/tdcm";
import { DeepPartial } from "@vis-three/utils";

export interface BasicEventConfig {
  name: string | Symbol;
}

export type EventGenerator<
  C extends BasicEventConfig = BasicEventConfig,
  E extends EngineSupport = EngineSupport
> = (engine: E, config: C) => (event?: ObjectEvent) => void;

export class EventManager {
  private static engine: EngineSupport;
  private static configLibrary = new Map<string | Symbol, unknown>();
  private static generatorLibrary = new Map<
    string | Symbol,
    EventGenerator<any>
  >();

  static register = function <C extends BasicEventConfig>({
    config,
    generator,
  }: {
    config: C;
    generator: EventGenerator<C>;
  }): EventManager {
    if (EventManager.configLibrary.has(config.name)) {
      console.warn(
        `EventManager has already exist this event generator: ${config.name}, that will be cover.`
      );
      return EventManager;
    }

    EventManager.configLibrary.set(
      config.name,
      JSON.parse(JSON.stringify(config))
    );

    EventManager.generatorLibrary.set(config.name, generator);
    return EventManager;
  };

  static generateConfig<C extends BasicEventConfig = BasicEventConfig>(
    name: string,
    merge: DeepPartial<C>
  ): C | null {
    if (!EventManager.configLibrary.has(name)) {
      console.warn(`event library can not found config by name: ${name}`);
      return null;
    }

    const recursion = (config: BasicEventConfig, merge: object) => {
      for (const key in merge) {
        if (
          typeof merge[key] === "object" &&
          merge[key] !== null &&
          !Array.isArray(merge[key])
        ) {
          recursion(config[key], merge[key]);
        } else {
          config[key] = merge[key];
        }
      }
    };

    const template = JSON.parse(
      JSON.stringify(EventManager.configLibrary.get(name)!)
    );

    recursion(template, merge);

    return template as C;
  }

  static generateEvent(
    config: BasicEventConfig,
    engine: EngineSupport
  ): (event?: ObjectEvent) => void {
    if (!EventManager.generatorLibrary.has(config.name)) {
      console.error(
        `event library can not found generator by name: ${config.name}`
      );
      return () => {};
    }

    return EventManager.generatorLibrary.get(config.name)!(engine, config);
  }

  static has(name: string): boolean {
    return EventManager.configLibrary.has(name);
  }

  static useEngine(engine: EngineSupport) {
    EventManager.engine = engine;
  }

  static createEvent<C extends BasicEventConfig = BasicEventConfig>(
    name: string,
    merge: DeepPartial<C>,
    engine?: EngineSupport
  ): ((event?: ObjectEvent | undefined) => void) | null {
    if (!EventManager.engine && !engine) {
      console.error(
        `EventGenerator Manager createEvent must provide an engine, you can use 'useEngine' to set it.`
      );

      return null;
    }

    const config = EventManager.generateConfig<C>(name, merge);

    if (!config) {
      return null;
    }

    return EventManager.generateEvent(config, engine || EventManager.engine);
  }
}
