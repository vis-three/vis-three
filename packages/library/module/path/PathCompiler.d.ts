import { CompileNotice, Compiler } from "@vis-three/middleware";
import { PathConfig } from "./PathConfig";
export declare class PathCompiler extends Compiler<PathConfig, object> {
    constructor();
    compile(vid: string, notice: CompileNotice): this;
}
