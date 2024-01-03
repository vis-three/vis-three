import { Component } from ".";

export enum LifeCycleHooks {
  MOUNTED = "mounted",
  BEFORE_DISTORY = "beforeDistory",
  UPDATE = "update",
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
