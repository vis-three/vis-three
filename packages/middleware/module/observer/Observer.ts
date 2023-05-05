import { Subject } from "rxjs";
import { react } from "./reactive";

export interface Ignore {
  [key: string]: Ignore | boolean;
}

export interface ReactNotice {
  operate: "add" | "set" | "delete";
  path: string;
  key: string;
  value: any;
}

export class Observer<T extends object> extends Subject<ReactNotice> {
  private ignore: Ignore = {};
  target: T;

  constructor(object: T, ignore?: Ignore) {
    super();
    ignore && (this.ignore = ignore);
    this.target = react(this, object);
  }

  isIgnore(path: string): boolean {
    let ignore = this.ignore;
    for (const key of path.split(".")) {
      if (ignore[key] === undefined) {
        return false;
      }

      if (typeof ignore[key] === "boolean" && ignore[key]) {
        return true;
      } else {
        ignore = ignore[key] as Ignore;
      }
    }
    return false;
  }

  setIgnore(ignore: Ignore) {
    this.ignore = ignore;
  }

  mergeIgnore(ignore: Ignore) {
    this.ignore = Object.assign(this.ignore, ignore);
  }
}
