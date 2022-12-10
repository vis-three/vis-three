import { EngineSupport } from "../engine";
import { ObjectEvent } from "../plugin/EventManagerPlugin/EventManager";

export interface BasicEventConfig {
  name: string | Symbol;
}

export type EventGenerator<C extends BasicEventConfig> = (
  engine: EngineSupport,
  config: C
) => (event?: ObjectEvent) => void;

export class EventLibrary {
  private static configLibrary = new Map<string | Symbol, unknown>();
  private static generatorLibrary = new Map<
    string | Symbol,
    EventGenerator<any>
  >();

  static register = function <C extends BasicEventConfig>(
    config: C,
    generator: EventGenerator<C>
  ) {
    if (EventLibrary.configLibrary.has(config.name)) {
      console.warn(
        `EventLibrary has already exist this event generator: ${config.name}, that will be cover.`
      );
    }

    EventLibrary.configLibrary.set(
      config.name,
      JSON.parse(JSON.stringify(config))
    );

    EventLibrary.generatorLibrary.set(config.name, generator);
  };

  static generateConfig(name: string, merge: object): BasicEventConfig {
    if (!EventLibrary.configLibrary.has(name)) {
      console.warn(`event library can not found config by name: ${name}`);
      return {
        name: "",
      };
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
      JSON.stringify(EventLibrary.configLibrary.get(name)!)
    );

    recursion(template, merge);

    return template;
  }

  static generateEvent(
    config: BasicEventConfig,
    engine: EngineSupport
  ): (event?: ObjectEvent) => void {
    if (!EventLibrary.generatorLibrary.has(config.name)) {
      console.error(
        `event library can not found generator by name: ${config.name}`
      );
      return () => {};
    }

    return EventLibrary.generatorLibrary.get(config.name)!(engine, config);
  }

  static has(name: string): boolean {
    return EventLibrary.configLibrary.has(name);
  }
}
