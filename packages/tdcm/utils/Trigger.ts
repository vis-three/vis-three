import { OBJECTMODULE } from "../module";

export interface Trigger {
  trig: Function;
  test: () => boolean;
}

export abstract class ModuleTrigger implements Trigger {
  condition: Record<string, boolean> = {};

  registerModule(module: string): this {
    this.condition[module] = false;
    return this;
  }

  updateCondition(module: string): this {
    if (typeof this.condition[module] !== "undefined") {
      this.condition[module] = true;
    }

    return this;
  }

  reset() {
    Object.keys(this.condition).forEach((key) => {
      this.condition[key] = false;
    });
  }

  test() {
    return !Object.values(this.condition).includes(false);
  }

  trig() {}
}

export class ObjectModuleTrigger extends ModuleTrigger {
  private triggerList: ((immediate?: boolean) => void)[] = [];

  constructor() {
    super();
  }

  registerModule(module: string): this {
    if (OBJECTMODULE[module]) {
      return super.registerModule(module);
    }
    return this;
  }

  registerExec(fun: (immediate?: boolean) => boolean) {
    if (!fun(true)) {
      this.triggerList.push(fun);
    }
  }

  trig() {
    const list = this.triggerList;
    for (const fun of list) {
      fun();
    }
    this.reset();
  }

  reset(): void {
    this.triggerList = [];
    super.reset();
  }
}

export const globalObjectModuleTrigger = new ObjectModuleTrigger();
