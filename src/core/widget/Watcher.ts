import { Subscription } from "rxjs";
import { ReactNotice } from "../Observable";
import { Observer } from "./Observer";

export class Watcher {
  static map = new Map<Symbol, Watcher>();
  token = Symbol("VIS.RENDER.WATCHER");

  private target: object = {};
  private path = "";
  private dep: Record<string, boolean> = {};
  private ob!: Observer;
  private run: () => any;

  constructor(fun: () => any) {
    this.run = fun;

    Watcher.map.set(this.token, this);
  }

  init(path: string, target: object, ob: Observer) {
    this.target = target;
    this.path = path;
    this.ob = ob;
  }

  notify(path: string) {
    if (this.dep[path]) {
      this.update();
    }
  }

  update() {
    const path = this.path.split(".");
    const key = path.pop()!;

    let object = this.target;

    for (const key of path) {
      object = object[key];
    }

    const sub = this.ob.subscribe((notice: ReactNotice) => {
      if (notice.operate === "get") {
        this.dep[notice.path] = true;
      }
    });

    object[key] = this.run();

    sub.unsubscribe();
  }
}
