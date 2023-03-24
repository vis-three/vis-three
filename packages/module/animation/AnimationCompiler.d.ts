import { CompileNotice, Compiler } from "../module";
import { AnimationAllType } from "./AnimationConfig";
export declare class AnimationCompiler extends Compiler<AnimationAllType, Function> {
    scriptAniSymbol: string;
    constructor();
    private restoreAttribute;
    cover(config: AnimationAllType): this;
    remove(config: AnimationAllType): this;
    compile(vid: string, notice: CompileNotice): this;
}
