import { Tween } from "@tweenjs/tween.js";
import { Color } from "three";
import { EngineSupport } from "../../../engine/EngineSupport";
import { ObjectEvent } from "../../../manager/EventManager";
import { RenderEvent } from "../../../manager/RenderManager";
import { BasicEventConfig, EventGenerator } from "../EventLibrary";
import { timingFunction, TIMINGFUNCTION } from "./common";

export interface ColorChange extends BasicEventConfig {
  params: {
    target: string;
    attribute: string;
    color: string;
    delay: number;
    duration: number;
    timingFunction: TIMINGFUNCTION;
  };
}

export const config: ColorChange = {
  name: "colorChange",
  params: {
    target: "",
    attribute: "color",
    color: "rgb(255, 255, 255)",
    delay: 0,
    duration: 500,
    timingFunction: TIMINGFUNCTION.EASING_QUADRATIC_INOUT,
  },
};

export const generator: EventGenerator<ColorChange> = function (
  engine: EngineSupport,
  config: ColorChange
): (event?: ObjectEvent) => void {
  const params = config.params;
  const material = engine.getObjectBySymbol(params.target);

  if (!material) {
    console.warn(
      `real time animation ColorChange: can not found vid material: ${params.target}`
    );
    return () => {};
  }

  if (
    !material[params.attribute] ||
    !(material[params.attribute] instanceof Color)
  ) {
    console.warn(
      `real time animation ColorChange: material attribute is illeage: ${params.attribute}`
    );
    return () => {};
  }

  const supportData = engine.getConfigBySymbol(params.target)!;

  if (!supportData) {
    console.warn(
      `real time animation ColorChange: can not found material config: ${params.target}`
    );
    return () => {};
  }

  const color = new Color(params.color);
  const renderManager = engine.renderManager!;

  let animating = false;

  return () => {
    if (animating) {
      return;
    }

    animating = true;

    const tween = new Tween(material[params.attribute])
      .to({
        r: color.r,
        g: color.g,
        b: color.b,
      })
      .duration(params.duration)
      .delay(params.delay)
      .easing(timingFunction[params.timingFunction])
      .start();

    const renderFun = (event: RenderEvent) => {
      tween.update();
    };

    renderManager.addEventListener<RenderEvent>("render", renderFun);

    tween.onComplete(() => {
      renderManager.removeEventListener<RenderEvent>("render", renderFun);
      supportData[params.attribute] = params.color;
      animating = false;
    });
  };
};
