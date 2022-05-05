import { EngineSupport } from "../../../engine/EngineSupport";
import { ObjectEvent } from "../../../manager/EventManager";
import { BasicEventConfig, EventGenerator } from "../EventLibrary";

export interface OpenWindow extends BasicEventConfig {
  params: {
    url: string;
  };
}

export const config: OpenWindow = {
  name: "openWindow",
  params: {
    url: "",
  },
};

export const generator: EventGenerator<OpenWindow> = function (
  engine: EngineSupport,
  config: OpenWindow
): (event?: ObjectEvent) => void {
  return () => {
    window.open(config.params.url);
  };
};
