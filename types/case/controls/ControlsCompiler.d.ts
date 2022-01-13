import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { Compiler, CompilerTarget } from "../../middleware/Compiler";
import { TransformControlsConfig } from "./ControlsConfig";
export interface ControlsCompilerTarget extends CompilerTarget {
    TransformControls: TransformControlsConfig;
}
export interface ControlsCompilerParameters {
    target?: ControlsCompilerTarget;
    transformControls?: TransformControls;
}
export declare class ControlsCompiler extends Compiler {
    private target;
    private transformControls;
    constructor(parameters?: ControlsCompilerParameters);
    set(type: string, path: string[], key: string, value: any): this;
    setTarget(target: ControlsCompilerTarget): this;
    compileAll(): this;
    dispose(parameter: unknown): this;
}
