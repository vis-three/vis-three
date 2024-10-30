import { ObjectEvent } from "@vis-three/tdcm";
import { BasicEventConfig, EventGenerator } from "@vis-three/module-object";
import { ObjectConfig } from "@vis-three/module-object";
import { SceneEngineSupport } from "@vis-three/module-scene";

export interface SetParent extends BasicEventConfig {
  params: {
    /**目标物体 */
    target: string;
    /**父级物体 */
    parent: string;
    /**延迟时间 */
    delay: number;
  };
}

export const config: SetParent = {
  name: "setParent",
  params: {
    target: "",
    parent: "",
    delay: 0,
  },
};

export const generator: EventGenerator<SetParent, SceneEngineSupport> =
  function (engine, config): (event?: ObjectEvent) => void {
    const params = config.params;
    const parent = engine.getConfigBySymbol(params.parent)! as ObjectConfig;

    if (!parent) {
      console.warn(
        `basic event setParent: can not found vid config: ${params.parent}`
      );
      return () => {};
    }
    return () => {
      setTimeout(() => {
        if (!parent.children.includes(params.target)) {
          parent.children.push(params.target);
        }
      }, params.delay);
    };
  };
