export class Pipeline {
  config: any;

  constructor(config: any) {
    this.config = config;
  }

  pipe(fun: (config: any) => any): this {
    this.config = fun(this.config);
    return this;
  }

  get() {
    return this.config;
  }
}
