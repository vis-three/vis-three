export declare class Pipeline {
    config: any;
    constructor(config: any);
    /**
     * 管线处理
     * @param fun config => config 会自动传入当前管线的处理对象。
     * @returns this
     */
    pipe(fun: (config: any) => any): this;
    /**
     * 获取处理对象
     * @returns this.config
     */
    get(): any;
}
