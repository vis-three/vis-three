import { Vector3 } from "three";
import { Processor } from "../../core/Processor";
export class OrbitControlsProcessor extends Processor {
    config;
    target;
    engine;
    constructor() {
        super();
    }
    assemble(params) {
        this.config = params.config;
        this.target = params.control;
        this.engine = params.engine;
        this.assembly = true;
        return this;
    }
    process(params) {
        if (!this.assembly) {
            console.warn(`OrbitControls Processor unassembled`);
            return this;
        }
        if (params.key === "target" ||
            (params.path.length && params.path[0] === "target")) {
            this.setTarget(this.config.target);
            return this;
        }
        this.mergeAttribute([], params.key, params.value);
        return this;
    }
    setTarget(target) {
        if (typeof target === "object" && target !== null) {
            this.target.target = new Vector3(target.x, target.y, target.z);
        }
    }
    dispose() {
        this.config = undefined;
        this.target = undefined;
        this.assembly = false;
        return this;
    }
}
//# sourceMappingURL=OrbitControlsProcessor.js.map