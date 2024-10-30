import {
  EngineSupport,
  ObjectEvent,
  RenderEvent,
  Vector3Config,
} from "@vis-three/tdcm";
import { BasicEventConfig, EventGenerator } from "@vis-three/module-object";

import { CameraEngineSupport } from "@vis-three/module-camera";

export interface ChangeCamera extends BasicEventConfig {
  params: {
    /**要更换的相机 */
    camera: string;
    /**延迟时间 */
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
  function (engine, config): (event?: ObjectEvent) => void {
    const params = config.params;
    return () => {
      setTimeout(() => {
        engine.setCameraBySymbol(params.camera);
      }, params.delay);
    };
  };
