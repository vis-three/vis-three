import { Vector3Config } from "../../../middleware/common/CommonConfig";
import { BasicEventConfig, EventGenerator } from "../EventLibrary";
import { Tween } from "@tweenjs/tween.js";
import { timingFunction, TIMINGFUNCTION } from "./common";
import { globalAntiShake, EngineSupport } from "@vis-three/core";
import { ObjectEvent } from "../../../manager/EventManager";
import { ObjectConfig } from "../../../middleware/object/ObjectConfig";
import { RenderEvent } from "../../../manager/RenderManager";

export interface UpTo extends BasicEventConfig {
  params: {
    target: string;
    up: Vector3Config;
    delay: number;
    duration: number;
    timingFunction: TIMINGFUNCTION;
  };
}

export const config: UpTo = {
  name: "upTo",
  params: {
    target: "",
    up: {
      x: 0,
      y: 1,
      z: 0,
    },
    delay: 0,
    duration: 1000,
    timingFunction: TIMINGFUNCTION.EASING_QUADRATIC_INOUT,
  },
};

export const generator: EventGenerator<UpTo> = function (
  engine: EngineSupport,
  config: UpTo
): (event?: ObjectEvent) => void {
  const params = config.params;
  const compiler = engine.compilerManager;
  const object = compiler.getObjectBySymbol(params.target);

  if (!object) {
    console.warn(
      `real time animation upTo: can not found vid object: ${params.target}`
    );
    return () => {};
  }

  const renderManager = engine.renderManager!;
  // 同步配置
  const supportData = engine.dataSupportManager.getConfigBySymbol<ObjectConfig>(
    params.target
  );

  if (!supportData) {
    console.warn(`can not found object config: ${params.target}`);
    return () => {};
  }

  // 防止重复触发
  let animating = false;

  return () => {
    if (animating) {
      return;
    }

    animating = true;

    const tween = new Tween(object!.up)
      .to(params.up)
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
      supportData!.up.x = params.up.x;
      supportData!.up.y = params.up.y;
      supportData!.up.z = params.up.z;
      animating = false;
    });
  };
};
