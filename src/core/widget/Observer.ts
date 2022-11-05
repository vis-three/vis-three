import { ProxyNotice } from "../DataContainer";
import { Dependence } from "./Dependence";

export class Observer {
  private deps: Set<Dependence> = new Set();

  constructor() {
    // super();
    // this.addEventListener<ProxyEvent>("broadcast", (event) => {
    //   if (event.notice.operate !== "get") {
    //     this.deps.forEach((dep) => {
    //       dep.notify(event.notice);
    //     });
    //   }
    // });
  }

  addDep(dep: Dependence) {
    this.deps.add(dep);
  }
}
