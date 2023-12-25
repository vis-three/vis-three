import { Component } from ".";

export enum LifeCycleHooks {
  MOUNTED = "mounted",
}

export const onMounted = function (fn: Function = () => {}) {
  Component.currentComponent &&
    Component.currentComponent.on(LifeCycleHooks.MOUNTED, (event) => fn());
};
