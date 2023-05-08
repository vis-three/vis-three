export class Pipeline {
    config;
    constructor(config) {
        this.config = config;
    }
    pipe(fun) {
        this.config = fun(this.config);
        return this;
    }
    get() {
        return this.config;
    }
}
