import { Vector3Config } from "../../../middleware/common/CommonConfig";
import { BasicEventConfig, EventGenerator } from "../EventLibrary";
import { Tween } from "@tweenjs/tween.js";
import { timingFunction, TIMINGFUNCTION } from "./common";
import { EngineSupport } from "../../../engine/EngineSupport";
import { ObjectEvent } from "../../../manager/EventManager";
import { ObjectConfig } from "../../../middleware/object/ObjectConfig";
import { RenderEvent } from "../../../manager/RenderManager";

export interface MoveTo extends BasicEventConfig {
  params: {
    target: string;
    position: Vector3Config;
    delay: number;
    duration: number;
    timingFunction: TIMINGFUNCTION;
  };
}

export const config: MoveTo = {
  name: "moveTo",
  params: {
    target: "",
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
    delay: 0,
    duration: 1000,
    timingFunction: TIMINGFUNCTION.EASING_QUARTIC_IN,
  },
};

export const generator: EventGenerator<MoveTo> = function (
  engine: EngineSupport,
  config: MoveTo
): (event?: ObjectEvent) => void {
  const params = config.params;
  const compiler = engine.compilerManager;
  const object = compiler.getObjectBySymbol(params.target);

  if (!object) {
    console.warn(
      `real time animation moveTO: can not found vid object: ${params.target}`
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

  return () => {
    const tween = new Tween(object!.position)
      .to(params.position)
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
      supportData!.position.x = params.position.x;
      supportData!.position.y = params.position.y;
      supportData!.position.z = params.position.z;
    });
  };
};
