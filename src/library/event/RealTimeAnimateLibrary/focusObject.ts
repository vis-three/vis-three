import { Tween } from "@tweenjs/tween.js";
import { Object3D, Vector3 } from "three";
import { EngineSupport } from "../../../engine/EngineSupport";
import { ObjectEvent } from "../../../manager/EventManager";
import { RenderEvent } from "../../../manager/RenderManager";
import { CameraConfig } from "../../../middleware/camera/CameraConfig";
import { Vector3Config } from "../../../middleware/common/CommonConfig";
import { BasicEventConfig, EventGenerator } from "../EventLibrary";
import { timingFunction, TIMINGFUNCTION } from "./common";

export interface FocusObject extends BasicEventConfig {
  params: {
    target: string;
    space: "local" | "world";
    offset: Vector3Config;
    delay: number;
    duration: number;
    timingFunction: TIMINGFUNCTION;
    back: boolean;
  };
}

export const config: FocusObject = {
  name: "focusObject",
  params: {
    target: "",
    space: "world",
    offset: {
      x: 0,
      y: 0,
      z: 20,
    },
    delay: 0,
    duration: 1000,
    timingFunction: TIMINGFUNCTION.EASING_QUADRATIC_INOUT,
    back: true,
  },
};

export const generator: EventGenerator<FocusObject> = function (
  engine: EngineSupport,
  config: FocusObject
): (event?: ObjectEvent) => void {
  const params = config.params;
  const target = engine.getObjectBySymbol(params.target)!;
  const camera = engine.camera;
  const cameraConfig = engine.getObjectConfig(camera) as CameraConfig;
  const orb = engine.orbitControls && engine.orbitControls.object === camera;
  const orbTarget = engine.orbitControls!.target;

  if (!target) {
    console.warn(
      `real time animation focusObject: can not found vid object: ${params.target}`
    );
    return () => {};
  }

  if (!(target instanceof Object3D)) {
    console.warn(
      `real time animation focusObject: vid object is not a class of THREE.Object3D: ${params.target}`
    );
    return () => {};
  }

  if (!cameraConfig) {
    console.warn(`engine current camera can not found config.`);
  }

  // 防止重复触发
  let animating = false;

  return () => {
    if (animating) {
      return;
    }

    animating = true;

    const renderManager = engine.renderManager!;
    // 根据space计算position
    let position = {
      x: target.matrixWorld[12] + params.offset.x,
      y: target.matrixWorld[13] + params.offset.y,
      z: target.matrixWorld[14] + params.offset.z,
    };

    const backPosition = {
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z,
    };

    if (params.space === "local") {
      const vector3 = new Vector3(
        params.offset.x,
        params.offset.y,
        params.offset.z
      ).applyEuler(target.rotation);

      position = {
        x: target.position.x + vector3.x,
        y: target.position.y + vector3.y,
        z: target.position.z + vector3.z,
      };
    }

    const positionTween = new Tween(camera.position)
      .to(position)
      .duration(params.duration)
      .delay(params.delay)
      .easing(timingFunction[params.timingFunction])
      .start();

    let upTween: Tween<Vector3>;

    const backUp = {
      x: camera.up.x,
      y: camera.up.y,
      z: camera.up.z,
    };

    if (params.space === "local") {
      // scene up
      const upVector3 = new Vector3(0, 1, 0).applyEuler(target.rotation);

      upTween = new Tween(camera.up)
        .to({
          x: upVector3.x,
          y: upVector3.y,
          z: upVector3.z,
        })
        .duration(params.duration)
        .delay(params.delay)
        .easing(timingFunction[params.timingFunction])
        .start();
    }

    let orbTween: Tween<Vector3>;
    const backOrb = {
      x: orbTarget.x,
      y: orbTarget.y,
      z: orbTarget.z,
    };
    if (orb) {
      orbTween = new Tween(orbTarget)
        .to(target.position)
        .duration(params.duration)
        .delay(params.delay)
        .easing(timingFunction[params.timingFunction])
        .start();
    }

    let renderFun;

    if (orb && params.space === "local") {
      renderFun = (event: RenderEvent) => {
        positionTween.update();
        upTween.update();
        orbTween.update();
      };
    } else if (orb) {
      renderFun = (event: RenderEvent) => {
        positionTween.update();
        orbTween.update();
      };
    } else if (params.space === "local") {
      renderFun = (event: RenderEvent) => {
        positionTween.update();
        upTween.update();
      };
    } else {
      renderFun = (event: RenderEvent) => {
        positionTween.update();
      };
    }

    renderManager.addEventListener<RenderEvent>("render", renderFun);

    positionTween.onComplete(() => {
      renderManager.removeEventListener<RenderEvent>("render", renderFun);
      if (cameraConfig) {
        cameraConfig.position.x = position.x;
        cameraConfig.position.y = position.y;
        cameraConfig.position.z = position.z;
      }

      animating = false;

      if (params.back) {
        const backFun = () => {
          const positionTween = new Tween(camera.position)
            .to(backPosition)
            .duration(params.duration)
            .delay(params.delay)
            .easing(timingFunction[params.timingFunction])
            .start();

          let upTween;
          if (params.space === "local") {
            upTween = new Tween(camera.up)
              .to(backUp)
              .duration(params.duration)
              .delay(params.delay)
              .easing(timingFunction[params.timingFunction])
              .start();
          }

          let orbTween;
          if (orb) {
            orbTween = new Tween(orbTarget)
              .to(backOrb)
              .duration(params.duration)
              .delay(params.delay)
              .easing(timingFunction[params.timingFunction])
              .start();
          }

          const renderFun = (event: RenderEvent) => {
            positionTween.update();
            upTween && upTween.update();
            orbTween && orbTween.update();
          };

          positionTween.onComplete(() => {
            renderManager.removeEventListener<RenderEvent>("render", renderFun);
          });

          renderManager.addEventListener<RenderEvent>("render", renderFun);
          document.removeEventListener("dblclick", backFun);
        };

        document.addEventListener("dblclick", backFun);
      }
    });
  };
};
