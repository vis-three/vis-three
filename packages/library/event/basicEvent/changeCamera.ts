import {
  BasicEventConfig,
  EventGenerator,
  ObjectEvent,
} from "@vis-three/middleware";

import { CameraEngineSupport } from "@vis-three/module-camera";

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

export const generator: EventGenerator<ChangeCamera, CameraEngineSupport> =
  function (
    engine,
    config
  ): (event?: ObjectEvent) => void {
    const params = config.params;
    return () => {
      setTimeout(() => {
        engine.setCameraBySymbol(params.camera);
      }, params.delay);
    };
  };
