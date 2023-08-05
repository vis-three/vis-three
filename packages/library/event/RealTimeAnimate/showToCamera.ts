import { Tween } from "@tweenjs/tween.js";
import {
  BasicEventConfig,
  EngineSupport,
  EventGenerator,
  ObjectEvent,
  RenderEvent,
  Vector3Config,
} from "@vis-three/middleware";
import { Euler, Matrix4, Object3D, Vector3 } from "three";
import { timingFunction, TIMINGFUNCTION } from "./common";
import { ObjectConfig } from "@vis-three/module-object";

export interface ShowToCamera extends BasicEventConfig {
  params: {
    target: string;
    offset: Vector3Config;
    delay: number;
    duration: number;
    timingFunction: TIMINGFUNCTION;
    back: boolean;
  };
}

export const config: ShowToCamera = {
  name: "showToCamera",
  params: {
    target: "",
    offset: {
      x: 0,
      y: 0,
      z: -30,
    },
    delay: 0,
    duration: 1000,
    timingFunction: TIMINGFUNCTION.EASING_QUADRATIC_INOUT,
    back: true,
  },
};

export const generator: EventGenerator<ShowToCamera> = function (
  engine: EngineSupport,
  config: ShowToCamera
): (event?: ObjectEvent) => void {
  const params = config.params;
  const target = engine.getObjectBySymbol(params.target)!;
  const targetConfig = engine.getConfigBySymbol(params.target)! as ObjectConfig;
  const camera = engine.camera;

  if (!target) {
    console.warn(
      `real time animation showToCamera: can not found vid object: ${params.target}`
    );
    return () => {};
  }

  if (!target) {
    console.warn(
      `real time animation showToCamera: can not found vid config: ${params.target}`
    );
    return () => {};
  }

  if (!(target instanceof Object3D)) {
    console.warn(
      `real time animation showToCamera: vid object is not a class of THREE.Object3D: ${params.target}`
    );
    return () => {};
  }

  const matrix4 = new Matrix4();
  const euler = new Euler();
  const vector3 = new Vector3();

  // 防止重复触发
  let animating = false;

  return () => {
    if (animating) {
      return;
    }

    animating = true;

    const renderManager = engine.renderManager!;

    vector3
      .set(params.offset.x, params.offset.y, params.offset.z)
      .applyEuler(camera.rotation);

    vector3.set(
      camera.position.x + vector3.x,
      camera.position.y + vector3.y,
      camera.position.z + vector3.z
    );

    matrix4.lookAt(camera.position, vector3, camera.up);
    euler.setFromRotationMatrix(matrix4);

    const cachePosition = {
      x: target.position.x,
      y: target.position.y,
      z: target.position.z,
    };
    const cacheRotation = {
      x: target.rotation.x,
      y: target.rotation.y,
      z: target.rotation.z,
    };

    const positionTween = new Tween(target.position)
      .to({
        x: vector3.x,
        y: vector3.y,
        z: vector3.z,
      })
      .duration(params.duration)
      .delay(params.delay)
      .easing(timingFunction[params.timingFunction])
      .start();

    const rotationTween = new Tween(target.rotation)
      .to({
        x: euler.x,
        y: euler.y,
        z: euler.z,
      })
      .duration(params.duration)
      .delay(params.delay)
      .easing(timingFunction[params.timingFunction])
      .start();

    const renderFun = (event: RenderEvent) => {
      positionTween.update();
      rotationTween.update();
    };

    renderManager.addEventListener<RenderEvent>("render", renderFun);

    positionTween.onComplete(() => {
      renderManager.removeEventListener<RenderEvent>("render", renderFun);

      // 更新数据
      targetConfig.position.x = vector3.x;
      targetConfig.position.y = vector3.y;
      targetConfig.position.z = vector3.z;
      targetConfig.rotation.x = euler.x;
      targetConfig.rotation.y = euler.y;
      targetConfig.rotation.z = euler.z;

      animating = false;

      if (params.back) {
        const backFun = () => {
          const positionTween = new Tween(target.position)
            .to(cachePosition)
            .duration(params.duration)
            .delay(params.delay)
            .easing(timingFunction[params.timingFunction])
            .start();

          const rotationTween = new Tween(target.rotation)
            .to(cacheRotation)
            .duration(params.duration)
            .delay(params.delay)
            .easing(timingFunction[params.timingFunction])
            .start();

          const renderFun = (event: RenderEvent) => {
            positionTween.update();
            rotationTween.update();
          };

          positionTween.onComplete(() => {
            renderManager.removeEventListener<RenderEvent>("render", renderFun);
            // 更新数据
            targetConfig.position.x = cachePosition.x;
            targetConfig.position.y = cachePosition.y;
            targetConfig.position.z = cachePosition.z;
            targetConfig.rotation.x = cacheRotation.x;
            targetConfig.rotation.y = cacheRotation.y;
            targetConfig.rotation.z = cacheRotation.z;
          });

          renderManager.addEventListener<RenderEvent>("render", renderFun);
          document.removeEventListener("dblclick", backFun);
        };

        document.addEventListener("dblclick", backFun);
      }
    });
  };
};
