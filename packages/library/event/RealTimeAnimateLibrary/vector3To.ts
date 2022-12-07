import { Tween } from "@tweenjs/tween.js";
import { EngineSupport } from "../../../engine/EngineSupport";
import { ObjectEvent } from "../../../manager/EventManager";
import { RenderEvent } from "../../../manager/RenderManager";
import { Vector3Config } from "../../../middleware/common/CommonConfig";
import { BasicEventConfig, EventGenerator } from "../EventLibrary";
import { timingFunction, TIMINGFUNCTION } from "./common";

export interface Vector3To extends BasicEventConfig {
  params: {
    target: string;
    attribute: string;
    props: {
      x: string;
      y: string;
      z: string;
    };
    delay: number;
    duration: number;
    to: Partial<Vector3Config>;
    timingFunction: TIMINGFUNCTION;
  };
}

export const config: Vector3To = {
  name: "vector3To",
  params: {
    target: "",
    attribute: ".position",
    props: {
      x: "x",
      y: "y",
      z: "z",
    },
    delay: 0,
    duration: 500,
    to: {},
    timingFunction: TIMINGFUNCTION.EASING_QUADRATIC_INOUT,
  },
};

export const generator: EventGenerator<Vector3To> = function (
  engine: EngineSupport,
  config: Vector3To
): (event?: ObjectEvent) => void {
  const params = config.params;
  const object = engine.compilerManager.getObjectBySymbol(params.target);
  if (!object) {
    console.warn(
      `real time animation vector3To: can not found vid object: ${params.target}`
    );
    return () => {};
  }

  const renderManager = engine.renderManager!;

  let supportData = engine.dataSupportManager.getConfigBySymbol(params.target)!;

  if (!supportData) {
    console.warn(
      `real time animation vector3To: can not found object config: ${params.target}`
    );
    return () => {};
  }

  const attributeList = params.attribute.split(".");
  attributeList.shift();

  let targetObject = object;

  for (const key of attributeList) {
    if (targetObject[key] === undefined) {
      console.error(
        `real time animation vector3To: object can not support key: ${key}`,
        object
      );
      return () => {};
    }
    targetObject = targetObject[key];
    supportData = supportData[key];
  }

  // 检测属性
  const props = params.props;

  if (
    !(props.x in targetObject) ||
    !(props.y in targetObject) ||
    !(props.z in targetObject)
  ) {
    console.error(
      `real time animation vector3To: object can not support props:`,
      targetObject,
      props
    );
    return () => {};
  }

  if (
    !(props.x in supportData) ||
    !(props.y in supportData) ||
    !(props.z in supportData)
  ) {
    console.error(
      `real time animation vector3To: config can not support props:`,
      supportData,
      props
    );
    return () => {};
  }

  const toObject = {
    x: params.to.x ?? targetObject[props.x],
    y: params.to.y ?? targetObject[props.y],
    z: params.to.z ?? targetObject[props.z],
  };

  // 防止重复触发
  let animating = false;

  return () => {
    if (animating) {
      return;
    }

    animating = true;

    const tween = new Tween(targetObject)
      .to(toObject)
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
      supportData[props.x] = toObject.x;
      supportData[props.y] = toObject.y;
      supportData[props.z] = toObject.z;
      animating = false;
    });
  };
};
