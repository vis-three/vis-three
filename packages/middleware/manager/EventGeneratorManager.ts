import { ObjectEvent } from "@vis-three/event-manager-plugin";
import { EngineSupport } from "../engine";

export interface BasicEventConfig {
  name: string | Symbol;
}

export type EventGenerator<C extends BasicEventConfig> = (
  engine: EngineSupport,
  config: C
) => (event?: ObjectEvent) => void;

export class EventGeneratorManager {
  private static configLibrary = new Map<string | Symbol, unknown>();
  private static generatorLibrary = new Map<
    string | Symbol,
    EventGenerator<any>
  >();

  static register = function <C extends BasicEventConfig>(
    config: C,
    generator: EventGenerator<C>
  ) {
    if (EventGeneratorManager.configLibrary.has(config.name)) {
      console.warn(
        `EventGeneratorManager has already exist this event generator: ${config.name}, that will be cover.`
      );
    }

    EventGeneratorManager.configLibrary.set(
      config.name,
      JSON.parse(JSON.stringify(config))
    );

    EventGeneratorManager.generatorLibrary.set(config.name, generator);
  };

  static generateConfig(name: string, merge: object): BasicEventConfig {
    if (!EventGeneratorManager.configLibrary.has(name)) {
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
      JSON.stringify(EventGeneratorManager.configLibrary.get(name)!)
    );

    recursion(template, merge);

    return template;
  }

  static generateEvent(
    config: BasicEventConfig,
    engine: EngineSupport
  ): (event?: ObjectEvent) => void {
    if (!EventGeneratorManager.generatorLibrary.has(config.name)) {
      console.error(
        `event library can not found generator by name: ${config.name}`
      );
      return () => {};
    }

    return EventGeneratorManager.generatorLibrary.get(config.name)!(engine, config);
  }

  static has(name: string): boolean {
    return EventGeneratorManager.configLibrary.has(name);
  }
}
