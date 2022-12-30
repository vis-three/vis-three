import {
  BasicEventConfig,
  EngineSupport,
  EventGenerator,
  ObjectEvent,
} from "@vis-three/middleware";

export interface ChangeCamera extends BasicEventConfig {
  params: {
    camera: string;
    delay: number;
  };
}

export const config: ChangeCamera = {
  name: "changeCamera",
  params: {
    camera: "",
    delay: 0,
  },
};

export const generator: EventGenerator<ChangeCamera> = function (
  engine: EngineSupport,
  config: ChangeCamera
): (event?: ObjectEvent) => void {
  const params = config.params;
  return () => {
    setTimeout(() => {
      engine.setCameraBySymbol(params.camera);
    }, params.delay);
  };
};
