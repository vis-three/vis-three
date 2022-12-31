export declare class Pipeline {
    config: any;
    constructor(config: any);
    pipe(fun: (config: any) => any): this;
    get(): any;
}
