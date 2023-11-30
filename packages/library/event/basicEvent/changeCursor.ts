import {
  BasicEventConfig,
  EngineSupport,
  EventGenerator,
  ObjectEvent,
} from "@vis-three/middleware";

export interface ChangeCursor extends BasicEventConfig {
  params: {
    cursor: string;
    delay: number;
  };
}

export const config: ChangeCursor = {
  name: "changeCursor",
  params: {
    cursor: "",
    delay: 0,
  },
};

export const generator: EventGenerator<ChangeCursor, EngineSupport> = function (
  engine,
  config
): (event?: ObjectEvent) => void {
  const params = config.params;
  return () => {
    setTimeout(() => {
      document.body.style.cursor = params.cursor;
    }, params.delay);
  };
};
