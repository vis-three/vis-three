import { CompileNotice, Compiler } from "@vis-three/middleware";
import { PathConfig } from "./PathConfig";
import { Path } from "three";
export declare class PathCompiler extends Compiler<PathConfig, Path> {
    constructor();
    compile(vid: string, notice: CompileNotice): this;
}
