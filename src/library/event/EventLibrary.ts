import { EngineSupport } from "../../engine/EngineSupport";
import { ObjectEvent } from "../../manager/EventManager";
import * as OpenWindow from "./BasicEventLibrary/openWindow";

import * as MoveTo from "./RealTimeAnimateLibrary/moveTo";
import * as MoveSpacing from "./RealTimeAnimateLibrary/moveSpacing";
import * as Vecter3To from "./RealTimeAnimateLibrary/vector3To";
import * as FocusObject from "./RealTimeAnimateLibrary/focusObject";
import * as FadeObject from "./RealTimeAnimateLibrary/fadeObject";

export interface BasicEventConfig {
  name: string;
}

export type EventGenerator<C extends BasicEventConfig> = (
  engine: EngineSupport,
  config: C
) => (event?: ObjectEvent) => void;

export class EventLibrary {
  private static configLibrary = new Map<string, unknown>();
  private static generatorLibrary = new Map<string, EventGenerator<any>>();

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

EventLibrary.register(OpenWindow.config, OpenWindow.generator);

EventLibrary.register(MoveTo.config, MoveTo.generator);
EventLibrary.register(MoveSpacing.config, MoveSpacing.generator);
EventLibrary.register(Vecter3To.config, Vecter3To.generator);
EventLibrary.register(FocusObject.config, FocusObject.generator);
EventLibrary.register(FadeObject.config, FadeObject.generator);
