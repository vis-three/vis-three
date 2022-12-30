import {
  BasicEventConfig,
  EngineSupport,
  EventGenerator,
  ObjectEvent,
} from "@vis-three/middleware";

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
