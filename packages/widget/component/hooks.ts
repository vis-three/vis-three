import { RenderEvent } from "@vis-three/middleware";
import { Component } from ".";

export enum LifeCycleHooks {
  MOUNTED = "mounted",
  BEFORE_DISTORY = "beforeDistory",
  UPDATE = "update",
  FRAME = "frame",
  CAMERA_CHANGE = "cameraChange",
  SCENE_CHANGE = "sceneCHange",
}

export const onMounted = function (fn: Function = () => {}) {
  Component.currentComponent &&
    Component.currentComponent.on(LifeCycleHooks.MOUNTED, (event) => fn());
};

export const onBeforeDistory = function (fn: Function = () => {}) {
  Component.currentComponent &&
    Component.currentComponent.on(LifeCycleHooks.BEFORE_DISTORY, (event) =>
      fn()
    );
};

export const onFrame = function (fn: Function = () => {}) {
  Component.currentComponent &&
    Component.currentComponent.on<RenderEvent>(LifeCycleHooks.FRAME, (event) =>
      fn(event.delta, event.total)
    );
};
