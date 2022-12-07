import { EngineSupport } from "../../../engine/EngineSupport";
import { ObjectEvent } from "../../../manager/EventManager";
import { BasicEventConfig, EventGenerator } from "../EventLibrary";

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
      engine.setCamera(params.camera);
    }, params.delay);
  };
};
