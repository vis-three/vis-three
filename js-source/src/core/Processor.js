export class Processor2 {
    configType;
    commands;
    create;
    dispose;
    constructor(options) {
        this.configType = options.configType;
        this.commands = options.commands;
        this.create = options.create;
        this.dispose = options.dispose;
    }
    process(params) {
        if (!this.commands || !this.commands[params.operate]) {
            this[params.operate](params);
            return;
        }
        let commands = this.commands[params.operate];
        for (const key of [].concat(params.path, params.key)) {
            if (!commands[key] && !commands.$reg) {
                this[params.operate](params);
                return;
            }
            else if (commands[key]) {
                if (typeof commands[key] === "function") {
                    commands[key](params);
                    return;
                }
                else {
                    commands = commands[key];
                }
            }
            else if (commands.$reg) {
                for (const item of commands.$reg) {
                    if (item.reg.test(key)) {
                        item.handler(params);
                        return;
                    }
                }
            }
        }
        this[params.operate](params);
    }
    add(params) {
        let target = params.target;
        const path = params.path;
        for (const key of path) {
            if (typeof target[key] !== undefined) {
                target = target[key];
            }
            else {
                console.warn(`processor can not exec default add operate.`, params);
                return;
            }
        }
        target[params.key] = params.value;
    }
    set(params) {
        let target = params.target;
        const path = params.path;
        for (const key of path) {
            if (typeof target[key] !== undefined) {
                target = target[key];
            }
            else {
                console.warn(`processor can not exec default set operate.`, params);
                return;
            }
        }
        target[params.key] = params.value;
    }
    delete(params) {
        let target = params.target;
        const path = params.path;
        for (const key of path) {
            if (typeof target[key] !== undefined) {
                target = target[key];
            }
            else {
                console.warn(`processor can not exec default delete operate.`, params);
                return;
            }
        }
        delete target[params.key];
    }
}
export const defineProcessor = (options) => {
    return new Processor2(options);
};
//# sourceMappingURL=Processor.js.map