import { Tween } from "@tweenjs/tween.js";
import {
  EngineSupport,
  ObjectEvent,
  RenderEvent,
  Vector3Config,
} from "@vis-three/tdcm";
import { BasicEventConfig, EventGenerator } from "@vis-three/module-object";
import { timingFunction, TIMINGFUNCTION } from "./common";
import { ObjectConfig } from "@vis-three/module-object";

export interface MoveToObject extends BasicEventConfig {
  params: {
    /**要移动的物体 */
    target: string;
    /**参照物体 */
    to: string;
    /**位置偏移量 */
    offset: Vector3Config;
    /**延迟时间 */
    delay: number;
    /**动画持续时间 */
    duration: number;
    /**动画变化函数 */
    timingFunction: TIMINGFUNCTION;
  };
}

export const config: MoveToObject = {
  name: "moveToObject",
  params: {
    target: "",
    to: "",
    offset: {
      x: 0,
      y: 0,
      z: 0,
    },
    delay: 0,
    duration: 1000,
    timingFunction: TIMINGFUNCTION.EASING_QUADRATIC_INOUT,
  },
};

export const generator: EventGenerator<MoveToObject> = function (
  engine: EngineSupport,
  config: MoveToObject
): (event?: ObjectEvent) => void {
  const params = config.params;
  const compiler = engine.compilerManager;
  const object = compiler.getObjectBySymbol(params.target);
  const toObject = compiler.getObjectBySymbol(params.to);

  if (!object) {
    console.warn(
      `real time animation MoveToObject: can not found vid object: ${params.target}`
    );
    return () => {};
  }

  if (!toObject) {
    console.warn(
      `real time animation MoveToObject: can not found vid object: ${params.target}`
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

    const position = {
      x: toObject.position.x + params.offset.x,
      y: toObject.position.y + params.offset.y,
      z: toObject.position.z + params.offset.z,
    };

    const tween = new Tween(object!.position)
      .to(position)
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
      supportData!.position.x = position.x;
      supportData!.position.y = position.y;
      supportData!.position.z = position.z;
      animating = false;
    });
  };
};
