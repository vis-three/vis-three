import { Subject, Subscription } from "rxjs";
import { getObservable, Observable, ReactNotice } from "../Observable";
import { extendPath, isObject } from "../../utils/utils";
import { Watcher } from "./Watcher";

export class Observer extends Subject<ReactNotice> {
  private subscriptions: Array<Subscription> = [];
  private watchers: Array<Watcher> = [];

  constructor() {
    super();
  }

  // 找出所有的observable添加观察
  watch(observed: object) {
    const rootObservable = getObservable(observed);
    if (!rootObservable) {
      console.error("Observer: can not found observable", observed);
      return;
    }

    // 找出 子 observable 用根 observable订阅子observable
    for (const key in observed) {
      if (isObject(observed[key])) {
        const child = getObservable(observed[key]);
        if (!child) {
          continue;
        }

        this.subscriptions.push(
          child.subscribe((notice: ReactNotice) => {
            rootObservable.next({
              operate: notice.operate,
              path: extendPath(key, notice.path),
              key: notice.key,
              value: notice.value,
            });
          })
        );
      }
    }

    this.subscriptions.push(
      rootObservable.subscribe((notice: ReactNotice) => {
        this.next(notice);
      })
    );

    this.subscriptions.push(
      this.subscribe((notice) => {
        if (notice.operate !== "get") {
          for (const watcher of this.watchers) {
            watcher.notify(notice.path);
          }
        }
      })
    );

    // 给所有的computed进行path watcher 映射
    const recursion = (object: object, path = "") => {
      for (const key in object) {
        const tempPath = extendPath(path, key);

        if (typeof object[key] === "symbol") {
          const watcher = Watcher.map.get(object[key]);
          if (!watcher) {
            continue;
          }
          watcher.init(tempPath, observed, this);
          this.watchers.push(watcher);
        } else if (isObject(object[key])) {
          recursion(object[key], tempPath);
        }
      }
    };

    recursion(observed);

    for (const watcher of this.watchers) {
      watcher.update();
    }
  }

  dispose() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
