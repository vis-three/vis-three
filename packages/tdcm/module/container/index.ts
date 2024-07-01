import { Subject, Subscription } from "rxjs";
import { globalOption } from "../../option";
import { BasicConfig } from "../common";
import { getObserver } from "../../utils/obTool";
import { ObNotice } from "../observer/Observer";

export interface CtnNotice extends ObNotice {
  symbol: string;
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
      path: "",
      key,
      value,
      symbol: key,
    });

    return result;
  } else {
    const result = Reflect.set(target, key, value);

    container.remove(value.vid);
    container.add(value);

    container.next({
      operate: "set",
      path: "",
      key,
      value,
      symbol: key,
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
    path: "",
    key,
    value,
    symbol: key,
  });

  container.remove(value.vid);

  return result;
};

export class Container<C extends BasicConfig> extends Subject<CtnNotice> {
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
      console.error("Container: this config can not observer", config);
      return;
    }

    this.subscriptions.set(
      observer.target.vid,
      observer.subscribe((notice) => {
        this.next({
          operate: notice.operate,
          path: notice.path,
          key: notice.key,
          value: notice.value,
          symbol: observer.target.vid,
        });
      })
    );
  }

  remove(vid: string) {
    this.subscriptions.delete(vid);
  }
}
