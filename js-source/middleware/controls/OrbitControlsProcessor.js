export class OrbitControlsProcessor {
    config;
    control;
    assembly = false;
    constructor() { }
    assemble(params) {
        this.config = params.config;
        this.control = params.control;
        this.assembly = true;
        return this;
    }
    process(params) {
        if (!this.assembly) {
            console.warn(`OrbitControls Processor unassembled`);
            return this;
        }
        this.merge(params.key, params.value);
        return this;
    }
    processAll() {
        if (!this.assembly) {
            console.warn(`OrbitControls Processor unassembled`);
            return this;
        }
        const control = this.control;
        const config = this.config;
        for (let key of Object.keys(config)) {
            control[key] !== undefined && (control[key] = config[key]);
        }
        return this;
    }
    dispose() {
        this.config = undefined;
        this.control = undefined;
        this.assembly = false;
        return this;
    }
    merge(key, value) {
        this.control[key] = value;
        return true;
    }
}
//# sourceMappingURL=OrbitControlsProcessor.js.map