import {
  EngineSupport,
  ObjectEvent,
  RenderEvent,
  Vector3Config,
} from "@vis-three/tdcm";
import { BasicEventConfig, EventGenerator } from "@vis-three/module-object";
import { ObjectConfig } from "@vis-three/module-object";
import { SceneEngineSupport } from "@vis-three/module-scene";

export interface SetPosition extends BasicEventConfig {
  params: {
    /**目标物体 */
    target: string;
    /**位置信息 */
    position: Vector3Config;
    /**延迟时间 */
    delay: number;
  };
}

export const config: SetPosition = {
  name: "setPosition",
  params: {
    target: "",
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
    delay: 0,
  },
};

export const generator: EventGenerator<SetPosition, SceneEngineSupport> =
  function (engine, config): (event?: ObjectEvent) => void {
    const params = config.params;
    const target = engine.getConfigBySymbol(params.target)! as ObjectConfig;

    if (!target) {
      console.warn(
        `basic event setPosition: can not found vid config: ${params.target}`
      );
      return () => {};
    }
    return () => {
      setTimeout(() => {
        target.position.x = params.position.x;
        target.position.y = params.position.y;
        target.position.z = params.position.z;
      }, params.delay);
    };
  };
