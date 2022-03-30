import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Process, Processor } from "../../core/Processor";
import { OrbitControlsConfig } from "./ControlsConfig";
export interface ProcessAssemble {
    control: OrbitControls;
    config: OrbitControlsConfig;
}
export declare class OrbitControlsProcessor implements Processor {
    private config?;
    private control?;
    private assembly;
    constructor();
    assemble(params: ProcessAssemble): this;
    process(params: Process): this;
    processAll(): this;
    dispose(): this;
    private merge;
}
