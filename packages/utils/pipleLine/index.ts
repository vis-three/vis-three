export class Pipeline {
  config: any;

  constructor(config: any) {
    this.config = config;
  }

  /**
   * 管线处理
   * @param fun config => config 会自动传入当前管线的处理对象。
   * @returns this
   */
  pipe(fun: (config: any) => any): this {
    this.config = fun(this.config);
    return this;
  }

  /**
   * 获取处理对象
   * @returns this.config
   */
  get() {
    return this.config;
  }
}
