import { globalAntiShake, EngineSupport } from "@vis-three/core";
import { ObjectEvent } from "../../../manager/EventManager";
import { BasicEventConfig, EventGenerator } from "../EventLibrary";

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

export const generator: EventGenerator<ChangeScene> = function (
  engine: EngineSupport,
  config: ChangeScene
): (event?: ObjectEvent) => void {
  const params = config.params;
  return () => {
    setTimeout(() => {
      engine.setScene(params.scene);
    }, params.delay);
  };
};
