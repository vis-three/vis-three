export class TransformControlsProcessor {
    config;
    control;
    assembly = false;
    filterMap = {
        translationSnap: true,
        rotationSnap: true,
        scaleSnap: true
    };
    constructor() { }
    assemble(params) {
        this.config = params.config;
        this.control = params.control;
        this.assembly = true;
        return this;
    }
    process(params) {
        if (!this.assembly) {
            console.warn(`transformControls Processor unassembled`);
            return this;
        }
        if (this.filterMap[params.key]) {
            return this;
        }
        if (this[params.key]) {
            this[params.key](params.value);
            return this;
        }
        this.merge(params.key, params.value);
        return this;
    }
    processAll() {
        if (!this.assembly) {
            console.warn(`transformControls Processor unassembled`);
            return this;
        }
        const config = this.config;
        for (let key of Object.keys(config)) {
            this.process({
                path: [],
                key,
                value: config[key]
            });
        }
        return this;
    }
    dispose() {
        this.config = undefined;
        this.control = undefined;
        return this;
    }
    snapAllow(value) {
        const config = this.config;
        const control = this.control;
        if (value) {
            control.translationSnap = config.translationSnap;
            control.rotationSnap = config.rotationSnap;
            // @ts-ignore types 没写 源码有这个属性
            control.scaleSnap = config.scaleSnap;
        }
        else {
            control.translationSnap = null;
            control.rotationSnap = null;
            // @ts-ignore types 没写 源码有这个属性
            control.scaleSnap = null;
        }
        return true;
    }
    merge(key, value) {
        this.control[key] = value;
        return true;
    }
}
//# sourceMappingURL=TransformControlsProcessor.js.map