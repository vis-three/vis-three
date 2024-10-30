import {
  EngineSupport,
  ObjectEvent,
  RenderEvent,
  Vector3Config,
} from "@vis-three/tdcm";
import { BasicEventConfig, EventGenerator } from "@vis-three/module-object";

export interface ChangeCursor extends BasicEventConfig {
  params: {
    /**指针类型 */
    cursor: string;
    /**延迟时间 */
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
