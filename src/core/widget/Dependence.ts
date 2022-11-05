import { ProxyEvent, ProxyNotice } from "../DataContainer";
import { Observer } from "./Observer";

export class Dependence {
  private dep: Record<string, Set<string>> = {};
  private target: Record<string, any> = {};

  private createSign(notice: ProxyNotice) {
    return notice.path.length
      ? `${notice.path.join(".")}.${notice.key}`
      : notice.key;
  }

  private walk(path: string, value: any) {
    if (path.includes(".")) {
      const list = path.split(".");
    } else {
      this.target[path] = value;
    }
  }

  setTarget(target: Record<string, any>) {
    this.target = target;
  }

  collect(collectKey: string, ob: Observer, fun: Function): any {
    const depend = (event: ProxyEvent) => {
      if (event.notice.operate === "get") {
        const depSign = this.createSign(event.notice);
        if (!this.dep[depSign]) {
          this.dep[depSign] = new Set();
        }
        this.dep[depSign].add(collectKey);
      }
    };

    ob.addEventListener<ProxyEvent>("broadcast", depend);

    const value = fun();

    ob.removeEventListener<ProxyEvent>("broadcast", depend);

    return value;
  }

  notify(notice: ProxyNotice) {
    const depSign = this.createSign(notice);
    if (this.dep[depSign]) {
      this.dep[depSign].forEach((path) => {});
    }
  }
}
