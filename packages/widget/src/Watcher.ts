import { Observer, ReactNotice } from "./Observer";
import { SYMBOL_WIDGET_WATCHER } from "./utils";

export class Watcher {
  static map = new Map<Symbol, Watcher>();
  token = Symbol(SYMBOL_WIDGET_WATCHER);

  private target: object = {};
  private key = "";
  private dep: Record<string, boolean> = {};
  private ob!: Observer;
  private run: () => any;

  constructor(fun: () => any) {
    this.run = fun;

    Watcher.map.set(this.token, this);
  }

  init(key: string, target: object, ob: Observer) {
    this.target = target;
    this.key = key;
    this.ob = ob;
  }

  notify(path: string) {
    if (this.dep[path]) {
      this.update();
    }
  }

  update() {
    const sub = this.ob.subscribe((notice: ReactNotice) => {
      if (notice.operate === "get") {
        this.dep[notice.path] = true;
      }
    });

    this.target[this.key] = this.run();

    sub.unsubscribe();
  }
}
