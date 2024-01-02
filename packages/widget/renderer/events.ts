import { ObjectEvent, SymbolConfig } from "@vis-three/middleware";
import { VNode, getOnProps } from "../vnode";
import { Object3D } from "three";

const EVENT_SYMBOL = Symbol.for("vis.widget.event");

export interface EventOptions {
  once?: boolean;
}

export interface Invoker {
  (event: ObjectEvent): void;
  value: Function;
}

export type EventConfig = SymbolConfig & {
  [EVENT_SYMBOL]?: Record<string, Invoker | undefined>;
};

export const createInvoker = function (fn: Function): Invoker {
  const invoker = function (event: ObjectEvent) {
    invoker.value(event);
  };

  invoker.value = fn;
  return invoker;
};

const eventOptionsReg = /Once$/;

export function parseName(name: string): [string, EventOptions] {
  let options: EventOptions = {};
  if (eventOptionsReg.test(name)) {
    options = {};
    let m;
    while ((m = name.match(eventOptionsReg))) {
      name = name.slice(0, name.length - m[0].length);
      (options as any)[m[0].toLowerCase()] = true;
    }
  }
  const event = name.slice(2).toLowerCase();
  return [event, options];
}

export const mountEvents = function (
  vnode: VNode,
  config: EventConfig,
  object: Object3D
) {
  if (config[EVENT_SYMBOL]) {
    console.error(`config has already create events`, config);
    return;
  }
  const eventProps = getOnProps(vnode);

  for (const key in eventProps) {
    eventProps[key] = createInvoker(eventProps[key]);
    const [name, options] = parseName(key);
    object.addEventListener(name, eventProps[key] as any);
  }

  config[EVENT_SYMBOL] = eventProps as Record<string, Invoker | undefined>;
};

export const updateEvents = function (vnode: VNode) {
  const props = vnode.props!;
  const config = vnode.config! as EventConfig;

  if (!config[EVENT_SYMBOL]) {
    return;
  }

  const events = config[EVENT_SYMBOL];

  for (const key in events) {
    const invoker = events[key];
    if (invoker && invoker.value !== props[key]) {
      invoker.value = props[key];
    }
  }
};

export const unmountEvents = function (vnode: VNode, object: Object3D) {
  const config = vnode.config! as EventConfig;

  if (!config[EVENT_SYMBOL]) {
    return;
  }

  const events = config[EVENT_SYMBOL];

  for (const key in events) {
    const invoker = events[key];
    if (invoker) {
      const [name, options] = parseName(key);
      object.removeEventListener(name, invoker as any);
    }
  }

  config[EVENT_SYMBOL] = undefined;
};
