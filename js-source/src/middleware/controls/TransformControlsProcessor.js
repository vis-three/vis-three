import { Processor } from "../../core/Processor";
export class TransformControlsProcessor extends Processor {
    config;
    target;
    filterMap = {
        translationSnap: true,
        rotationSnap: true,
        scaleSnap: true,
    };
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
        this.mergeAttribute([], params.key, params.value);
        return this;
    }
    dispose() {
        this.config = undefined;
        this.target = undefined;
        return this;
    }
    snapAllow(value) {
        const config = this.config;
        const control = this.target;
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
}
//# sourceMappingURL=TransformControlsProcessor.js.map