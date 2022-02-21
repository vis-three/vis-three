import { Compiler } from "../../core/Compiler";
export class EventCompiler extends Compiler {
    target;
    constructor(parameters) {
        super();
        if (parameters) {
            this.target = parameters.target;
        }
        else {
            this.target = {};
        }
    }
    add(vid, config) {
        return this;
    }
    remove() {
        return this;
    }
    setTarget(target) {
        this.target = target;
        return this;
    }
    compileAll() {
        const target = this.target;
        for (const key in target) {
            this.add(key, target[key]);
        }
        return this;
    }
    dispose() {
        return this;
    }
}
//# sourceMappingURL=EventCompiler.js.map