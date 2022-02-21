import { Compiler, CompilerTarget } from "../../core/Compiler";
import { EventConfig } from "./eventConfig";
export interface EventCompilerTarget extends CompilerTarget {
    [key: string]: EventConfig;
}
export interface EventCompilerParameters {
    target: EventCompilerTarget;
}
export declare class EventCompiler extends Compiler {
    private target;
    constructor(parameters?: EventCompilerParameters);
    add(vid: string, config: EventConfig): this;
    remove(): this;
    setTarget(target: EventCompilerTarget): this;
    compileAll(): this;
    dispose(): this;
}
