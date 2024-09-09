import {
  EngineSupport,
  ObjectEvent,
  RenderEvent,
  Vector3Config,
} from "@vis-three/tdcm";
import { BasicEventConfig, EventGenerator } from "@vis-three/module-object";
import { SceneEngineSupport } from "@vis-three/module-scene";

export interface ChangeScene extends BasicEventConfig {
  params: {
    scene: string;
    delay: number;
  };
}

export const config: ChangeScene = {
  name: "changeScene",
  params: {
    scene: "Scene",
    delay: 0,
  },
};

export const generator: EventGenerator<ChangeScene, SceneEngineSupport> =
  function (engine, config): (event?: ObjectEvent) => void {
    const params = config.params;
    return () => {
      setTimeout(() => {
        engine.setSceneBySymbol(params.scene);
      }, params.delay);
    };
  };
