import {
  BasicEventConfig,
  EngineSupport,
  EventGenerator,
  ObjectEvent,
} from "@vis-three/middleware";
import { AnimationConfig } from "@vis-three/module-animation";

export interface SwitchAnimate extends BasicEventConfig {
  params: {
    target: string;
    toggle: "auto" | "on" | "off";
    delay: 0;
  };
}

export const config: SwitchAnimate = {
  name: "switchAnimate",
  params: {
    target: "",
    toggle: "auto",
    delay: 0,
  },
};

export const generator: EventGenerator<SwitchAnimate> = function (
  engine: EngineSupport,
  config: SwitchAnimate
): (event?: ObjectEvent) => void {
  const params = config.params;
  const target = engine.getConfigBySymbol(params.target)! as AnimationConfig;

  if (!target) {
    console.warn(
      `basic event switchAnimate: can not found vid config: ${params.target}`
    );
    return () => {};
  }

  return () => {
    setTimeout(() => {
      if (params.toggle === "auto") {
        target.play != target.play;
        return;
      }

      if (params.toggle === "off") {
        target.play = false;
        return;
      }

      if (params.toggle === "on") {
        target.play = true;
        return;
      }
    }, params.delay);
  };
};
