import { isPromise, isFunction } from "@vue/shared";
import { Component } from "../component";

export function callWithErrorHandling(
  fn: Function,
  instance: Component | null,
  args?: unknown[]
) {
  let res;
  try {
    res = args ? fn(...args) : fn();
  } catch (err) {
    console.error(err);
  }
  return res;
}

export function callWithAsyncErrorHandling(
  fn: Function | Function[],
  instance: Component | null,
  args?: unknown[]
): any[] {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        console.error(err);
      });
    }
    return res;
  }

  const values: any[] = [];
  for (let i = 0; i < fn.length; i++) {
    values.push(callWithAsyncErrorHandling(fn[i], instance, args));
  }
  return values;
}
