import {
  AniScriptGenerator,
  BasicAniScriptConfig,
} from "@vis-three/module-animation";
import { EngineSupport, RenderEvent } from "@vis-three/tdcm";

export interface LinearTime extends BasicAniScriptConfig {
  /**时间倍率 */
  multiply: number;
}

export const config: LinearTime = {
  name: "linearTime",
  multiply: 1,
};

export const generator: AniScriptGenerator<LinearTime> = function (
  engine: EngineSupport,
  target: object,
  attribute: string,
  config: LinearTime
) {
  if (target[attribute] === undefined) {
    console.warn(`object not exist attribute: ${attribute}`, target);
    return (event: RenderEvent) => {};
  }

  if (typeof target[attribute] !== "number") {
    console.warn(`object attribute is not typeof number.`, target, attribute);
    return (event: RenderEvent) => {};
  }

  return (event: RenderEvent) => {
    target[attribute] += event.delta * config.multiply;
  };
};
