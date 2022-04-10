export class Processor {
    filterMap = {};
    assembly = false;
    constructor() {
        this.filterMap = Object.assign({
            vid: true,
            type: true,
        }, this.filterMap);
    }
    mergeAttribute(path, key, value) {
        if (this.filterMap[path.concat([key]).join(".")]) {
            return;
        }
        let object = this.target;
        if (path.length) {
            for (const key of path) {
                object = object[key];
            }
        }
        object[key] = value;
    }
    mergeObject(callBack) {
        const recursiveConfig = (config, object) => {
            for (const key in config) {
                if (this.filterMap[key]) {
                    continue;
                }
                if (typeof config[key] === "object" && typeof config[key] !== null) {
                    recursiveConfig(config[key], object[key]);
                    continue;
                }
                object[key] = config[key];
            }
        };
        recursiveConfig(this.config, this.target);
        callBack && callBack();
    }
    processAll() {
        const recursiveConfig = (config, path) => {
            for (const key in config) {
                if (this.filterMap[path.concat([key]).join(".")]) {
                    continue;
                }
                if (typeof config[key] === "object" && typeof config[key] !== null) {
                    recursiveConfig(config[key], path.concat([key]));
                    continue;
                }
                this.process({ path, key, value: config[key] });
            }
        };
        recursiveConfig(this.config, []);
        return this;
    }
}
//# sourceMappingURL=Processor.js.map