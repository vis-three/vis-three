import { Subject } from "rxjs";
import { react } from "./reactive";
import { getModel } from "../../utils/obTool";
import { MODEL_EVENT } from "../constant";

export interface ObNotice {
  operate: "add" | "set" | "delete";
  path: string;
  key: string;
  value: any;
}

/**
 * 观察者类
 * @internal
 */
export class Observer<T extends object> extends Subject<ObNotice> {
  static IGNORE = {
    vid: true,
    type: true,
    alias: true,
    meta: true,
  };

  target: T;
  disable = false;

  constructor(object: T) {
    super();

    this.target = react(this, object);
  }

  ignore(path: string): boolean {
    const split = path.indexOf(".");
    if (split === -1) {
      return Observer.IGNORE[path];
    }

    return Observer.IGNORE[path.slice(0, split)];
  }

  next(value: ObNotice): void {
    if (this.disable) {
      return;
    }

    super.next(value);

    const model = getModel(this.target);

    if (model) {
      model.emit(MODEL_EVENT.NOTICED);
    }
  }
}
