import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { Compiler, CompilerTarget } from "../../core/Compiler";
import { EngineSupport } from "../../main";
import { VisOrbitControls } from "../../optimize/VisOrbitControls";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ControlsAllConfig } from "./ControlsConfig";
export declare type ControlsAllType = TransformControls | VisOrbitControls;
export interface ControlsCompilerTarget extends CompilerTarget<ControlsAllConfig> {
}
export declare class ControlsCompiler extends Compiler<ControlsAllConfig, ControlsCompilerTarget, ControlsAllType> {
    MODULE: MODULETYPE;
    constructor();
    useEngine(engine: EngineSupport): this;
}
