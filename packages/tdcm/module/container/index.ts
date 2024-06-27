import { extendPath } from "@vis-three/utils";
import { Subject, Subscription } from "rxjs";
import { globalOption } from "../../option";
import { BasicConfig } from "../common";
import { getObserver } from "../../utils/utils";

export interface ProxyNotice {
  operate: "add" | "set" | "delete";
  path: string;
  key: string;
  value: any;
}

const containerGetter = function (
  target: any,
  key: string | symbol,
  receiver: any
) {
  return Reflect.get(target, key, receiver);
};

const containerSetter = function (
  target: any,
  key: string | symbol,
  value: any,
  receiver: any,
  container: Container<BasicConfig>
) {
  if (typeof key === "symbol") {
    return Reflect.set(target, key, value, receiver);
  }

  if (target[key] === undefined) {
    const result = Reflect.set(target, key, value);

    container.add(value);

    container.next({
      operate: "add",
      path: key,
      key,
      value,
    });

    return result;
  } else {
    const result = Reflect.set(target, key, value);

    container.remove(value.vid);
    container.add(value);

    container.next({
      operate: "set",
      path: key,
      key,
      value,
    });

    return result;
  }
};

const containerDeleter = function (
  target: any,
  key: string | symbol,
  container: Container<BasicConfig>
): boolean {
  if (typeof key === "symbol") {
    return Reflect.deleteProperty(target, key);
  }

  const value = target[key];
  const result = Reflect.deleteProperty(target, key);

  container.next({
    operate: "delete",
    path: key,
    key,
    value,
  });

  container.remove(value.vid);

  return result;
};

export class Container<C extends BasicConfig> extends Subject<ProxyNotice> {
  space: Record<string, C>;

  subscriptions = new Map<BasicConfig["vid"], Subscription>();

  constructor() {
    super();

    const generator = globalOption.proxy.expand
      ? (data: object = {}) => globalOption.proxy.expand!(data)
      : (data: object = {}) => data;

    if (globalOption.proxy.timing === "before") {
      this.space = new Proxy(generator(), {
        get: containerGetter,
        set: (target: any, key: string | symbol, value: any, receiver: any) =>
          containerSetter(target, key, value, receiver, this),
        deleteProperty: (target: any, key: string | symbol) =>
          containerDeleter(target, key, this),
      });
    } else {
      this.space = generator(
        new Proxy(
          {},
          {
            get: containerGetter,
            set: (
              target: any,
              key: string | symbol,
              value: any,
              receiver: any
            ) => containerSetter(target, key, value, receiver, this),
            deleteProperty: (target: any, key: string | symbol) =>
              containerDeleter(target, key, this),
          }
        )
      );
    }
  }

  add(config: C) {
    const observer = getObserver<C>(config);

    if (!observer) {
      console.error("DataContainer: this config can not observer", config);
      return;
    }

    this.subscriptions.set(
      observer.target.vid,
      observer.subscribe((notice) => {
        this.next({
          operate: notice.operate,
          path: extendPath(observer.target.vid, notice.path),
          key: notice.key,
          value: notice.value,
        });
      })
    );
  }

  remove(vid: string) {
    this.subscriptions.delete(vid);
  }
}
