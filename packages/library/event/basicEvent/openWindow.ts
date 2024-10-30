import {
  EngineSupport,
  ObjectEvent,
  RenderEvent,
  Vector3Config,
} from "@vis-three/tdcm";
import { BasicEventConfig, EventGenerator } from "@vis-three/module-object";

export interface OpenWindow extends BasicEventConfig {
  params: {
    /**链接地址 */
    url: string;
  };
}

export const config: OpenWindow = {
  name: "openWindow",
  params: {
    url: "",
  },
};

export const generator: EventGenerator<OpenWindow> = function (
  engine: EngineSupport,
  config: OpenWindow
): (event?: ObjectEvent) => void {
  return () => {
    window.open(config.params.url);
  };
};
