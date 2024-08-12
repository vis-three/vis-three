export class Trigger {
  private condition: Record<string, boolean> = {};
  private list: ((immediate: boolean) => boolean)[] = [];
  private validator: (module: string) => boolean = () => true;

  constructor(validator?: (module: string) => boolean) {
    if (validator) {
      this.validator = validator;
    }
  }

  add(module: string): this {
    if (this.validator(module)) {
      this.condition[module] = false;
    }

    return this;
  }

  reach(module: string): this {
    if (this.condition[module] === undefined) {
      console.warn(`ModuleTrigger: can not set module condition: ${module}.`);
      return this;
    }

    this.condition[module] = true;

    if (this.check()) {
      this.trig();
    }
    return this;
  }

  register(fun: (immediate: boolean) => boolean) {
    if (!fun(true)) {
      this.list.push(fun);
    }
  }

  trig() {
    const list = this.list;
    for (const fun of list) {
      fun(false);
    }
    this.reset();
  }

  reset(): void {
    this.list = [];
    Object.keys(this.condition).forEach((key) => {
      this.condition[key] = false;
    });
  }

  check() {
    return !Object.values(this.condition).includes(false);
  }
}

/**
 * @deprecated use ObjectTrigger
 */
export const globalObjectModuleTrigger = new Trigger();
