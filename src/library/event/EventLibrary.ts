import { EngineSupport } from "../../engine/EngineSupport";
import { ObjectEvent } from "../../manager/EventManager";

export interface BasicEventConfig {
  name: string;
}

export type EventGenerator<C extends BasicEventConfig> = (
  engine: EngineSupport,
  config: C
) => (event?: ObjectEvent) => void;

export class EventLibrary {
  getConfig(name: string) {}
  generateEvent(config: object) {}
}
