import {
  BasicEventConfig,
  EngineSupport,
  EventGenerator,
  ObjectEvent,
} from "@vis-three/middleware";
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
