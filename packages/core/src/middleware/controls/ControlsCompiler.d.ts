import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { Compiler } from "../../core/Compiler";
import { EngineSupport } from "../../main";
import { VisOrbitControls } from "../../optimize/VisOrbitControls";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ControlsAllConfig } from "./ControlsConfig";
export type ControlsAllType = TransformControls | VisOrbitControls;
export declare class ControlsCompiler extends Compiler<ControlsAllConfig, ControlsAllType> {
    MODULE: MODULETYPE;
    constructor();
    useEngine(engine: EngineSupport): this;
}
