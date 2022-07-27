import { Compiler } from "../../core/Compiler";
import { MODULETYPE } from "../constants/MODULETYPE";
import { scriptAniSymbol } from "./processor/common";
import ScriptAnimationProcessor from "./processor/ScriptAnimationProcessor";
export class AnimationCompiler extends Compiler {
    MODULE = MODULETYPE.ANIMATION;
    constructor() {
        super();
    }
    cover(config) {
        super.cover(config);
        const fun = this.map.get(config.vid);
        config[Symbol.for(scriptAniSymbol)] = fun;
        return this;
    }
    remove(config) {
        delete config[Symbol.for(scriptAniSymbol)];
        super.remove(config);
        return this;
    }
    compile(vid, notice) {
        super.compile(vid, notice);
        const config = this.target[vid];
        const fun = this.map.get(config.vid);
        config[Symbol.for(scriptAniSymbol)] = fun;
        return this;
    }
}
Compiler.processor(ScriptAnimationProcessor);
//# sourceMappingURL=AnimationCompiler.js.map