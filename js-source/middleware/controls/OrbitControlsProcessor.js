import { Processor } from "../../core/Processor";
export class OrbitControlsProcessor extends Processor {
    config;
    target;
    constructor() {
        super();
    }
    assemble(params) {
        this.config = params.config;
        this.target = params.control;
        this.assembly = true;
        return this;
    }
    process(params) {
        if (!this.assembly) {
            console.warn(`OrbitControls Processor unassembled`);
            return this;
        }
        this.mergeAttribute([], params.key, params.value);
        return this;
    }
    dispose() {
        this.config = undefined;
        this.target = undefined;
        this.assembly = false;
        return this;
    }
}
//# sourceMappingURL=OrbitControlsProcessor.js.map