import { Subject, Subscription } from "rxjs";
import { SymbolConfig } from "../middleware/common/CommonConfig";
import { extendPath } from "../utils/utils";
import { CompilerTarget } from "./Compiler";
import { getObservable } from "./Observable";

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
  container: DataContainer<SymbolConfig>
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
  }
  return Reflect.set(target, key, value, receiver);
};

const containerDeleter = function (
  target: any,
  key: string | symbol,
  container: DataContainer<SymbolConfig>
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

export class DataContainer<
  C extends SymbolConfig
> extends Subject<ProxyNotice> {
  container: CompilerTarget<C> = new Proxy(
    {},
    {
      get: containerGetter,
      set: (target: any, key: string | symbol, value: any, receiver: any) =>
        containerSetter(target, key, value, receiver, this),
      deleteProperty: (target: any, key: string | symbol) =>
        containerDeleter(target, key, this),
    }
  );

  subscriptions = new Map<SymbolConfig["vid"], Subscription>();

  constructor() {
    super();
  }

  add(config: C) {
    const observable = getObservable<C>(config);

    if (!observable) {
      console.error("DataContainer: this config can not Obasrvable", config);
      return;
    }

    this.subscriptions.set(
      observable.raw.vid,
      observable.subscribe((notice) => {
        if (notice.operate !== "get") {
          this.next({
            operate: notice.operate,
            path: extendPath(observable.raw.vid, notice.path), // 直接调用raw不会额外触发getter
            key: notice.key,
            value: notice.value,
          });
        }
      })
    );

    this.container[observable.raw.vid] = config;
  }

  remove(vid: string) {
    this.subscriptions.delete(vid);
  }
}
