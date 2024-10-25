import { RenderEvent } from "@vis-three/tdcm";
import { Component } from ".";

export enum LifeCycleHooks {
  MOUNTED = "mounted",
  BEFORE_DISTORY = "beforeDistory",
  UPDATE = "update",
  FRAME = "frame",
  CAMERA_CHANGE = "cameraChange",
  SCENE_CHANGE = "sceneCHange",
}

/**
 * 组件挂载完成后的钩子函数
 * @param fn 函数方法
 */
export const onMounted = function (fn: Function = () => {}) {
  Component.currentComponent &&
    Component.currentComponent.on(LifeCycleHooks.MOUNTED, (event) => fn());
};

/**
 * 组件销毁之前的钩子函数
 * @param fn 函数方法
 */
export const onBeforeDistory = function (fn: Function = () => {}) {
  Component.currentComponent &&
    Component.currentComponent.on(LifeCycleHooks.BEFORE_DISTORY, (event) =>
      fn()
    );
};

/**
 * 组件在每帧渲染时的钩子函数
 * @param fn 函数方法
 */
export const onFrame = function (fn: Function = () => {}) {
  Component.currentComponent &&
    Component.currentComponent.on<RenderEvent>(LifeCycleHooks.FRAME, (event) =>
      fn(event.delta, event.total)
    );
};
