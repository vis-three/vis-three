import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { Process, Processor } from "../../core/Processor";
import { TransformControlsConfig } from "./ControlsConfig";
export interface ProcessAssemble {
    control: TransformControls;
    config: TransformControlsConfig;
}
export declare class TransformControlsProcessor implements Processor {
    private config?;
    private control?;
    private assembly;
    private filterMap;
    constructor();
    assemble(params: ProcessAssemble): this;
    process(params: Process): this;
    processAll(): this;
    dispose(): this;
    private snapAllow;
    private merge;
}
