export class Pipeline {
    config;
    constructor(config) {
        this.config = config;
    }
    /**
     * 管线处理
     * @param fun config => config 会自动传入当前管线的处理对象。
     * @returns this
     */
    pipe(fun) {
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
