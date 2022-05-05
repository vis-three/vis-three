import { EngineSupport } from "../../main";
import { RenderEvent } from "../../manager/RenderManager";
import { AniScriptGenerator, BasicAniScriptConfig } from "./AniScriptLibrary";

export interface LinearTime extends BasicAniScriptConfig {
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
    console.error(`object not exist attribute: ${attribute}`, target);
  }
  if (typeof target[attribute] !== "number") {
    console.error(`object attribute is not typeof number.`, target, attribute);
    return (event: RenderEvent) => {};
  }

  return (event: RenderEvent) => {
    target[attribute] += event.delta * config.multiply;
  };
};
