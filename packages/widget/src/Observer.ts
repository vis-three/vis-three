import { Subject, Subscription } from "rxjs";
import { Watcher } from "./Watcher";
import { reactive } from "./reactive";

export interface ReactNotice {
  operate: "get" | "add" | "set" | "delete";
  path: string;
  key: string;
  value: any;
}

export class Observer extends Subject<ReactNotice> {
  constructor() {
    super();
  }

  watch(data: Record<string, any>) {
    return reactive(this, data);
  }
}
