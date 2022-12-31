import { Tween } from "@tweenjs/tween.js";
import { timingFunction, TIMINGFUNCTION } from "./common";
import { Object3D } from "three";
import {
  BasicEventConfig,
  EngineSupport,
  EventGenerator,
  ObjectEvent,
  RenderEvent,
  Vector3Config,
} from "@vis-three/middleware";
import { OrbitControlsEngine } from "@vis-three/orbit-controls-plugin";

export interface OrbitTargetMove extends BasicEventConfig {
  params: {
    target: string;
    offset: Vector3Config;
    delay: number;
    duration: number;
    timingFunction: TIMINGFUNCTION;
  };
}

export const config: OrbitTargetMove = {
  name: "orbitTargetMove",
  params: {
    target: "",
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

export interface OrbitSupportEngine
  extends EngineSupport,
    OrbitControlsEngine {}

export const generator: EventGenerator<OrbitTargetMove> = function (
  engine: EngineSupport,
  config: OrbitTargetMove
): (event?: ObjectEvent) => void {
  const params = config.params;
  const compiler = engine.compilerManager;

  if (!(<OrbitSupportEngine>engine).orbitControls) {
    console.warn(
      `real time animation orbitTargetMove: engine can not install orbitControls.`
    );
    return () => {};
  }

  const renderManager = engine.renderManager!;

  // 防止重复触发
  let animating = false;

  return () => {
    if (animating) {
      return;
    }

    animating = true;

    let position = params.offset;

    if (params.target) {
      const object = engine.getObjectBySymbol(params.target) as Object3D;

      if (!object) {
        console.warn(
          `real time animation orbitTargetMove: can not found vid object: ${params.target}`
        );
      } else {
        position = {
          x: object.matrixWorld.elements[12] + position.x,
          y: object.matrixWorld.elements[13] + position.y,
          z: object.matrixWorld.elements[14] + position.z,
        };
      }
    }

    const tween = new Tween((<OrbitSupportEngine>engine).orbitControls.target)
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
      animating = false;
    });
  };
};
