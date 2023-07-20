import { CompileNotice, Compiler, RenderEvent } from "@vis-three/middleware";
import { AnimationAllType } from "./AnimationConfig";
export declare class AnimationCompiler extends Compiler<AnimationAllType, Function> {
    scriptAniSymbol: string;
    constructor();
    playAnimation(fun: (event: RenderEvent) => void): void;
    stopAnimation(fun: (event: RenderEvent) => void): void;
    private restoreAttribute;
    cover(config: AnimationAllType): this;
    remove(config: AnimationAllType): this;
    compile(vid: string, notice: CompileNotice): this;
}
