import {
  AniScriptGenerator,
  BasicAniScriptConfig,
} from "@vis-three/module-animation";
import { EngineSupport, RenderEvent } from "@vis-three/tdcm";

export interface SinWave extends BasicAniScriptConfig {
  wavelength: number;
  offset: number;
  amplitude: number;
  speed: number;
}

export const config: SinWave = {
  name: "sinWave",
  wavelength: 1,
  offset: 0,
  amplitude: 1,
  speed: 1,
};

export const generator: AniScriptGenerator<SinWave> = function (
  engine: EngineSupport,
  target: object,
  attribute: string,
  config: SinWave
) {
  if (target[attribute] === undefined) {
    console.warn(`object not exist attribute: ${attribute}`, target);
    return (event: RenderEvent) => {};
  }

  if (typeof target[attribute] !== "number") {
    console.warn(`object attribute is not typeof number.`, target, attribute);
    return (event: RenderEvent) => {};
  }
  const origin = target[attribute];
  return (event: RenderEvent) => {
    target[attribute] =
      origin +
      config.amplitude *
        Math.sin((event.total * config.speed) / config.wavelength) +
      config.offset;
  };
};
