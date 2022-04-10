import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Process, Processor } from "../../core/Processor";
import { OrbitControlsConfig } from "./ControlsConfig";
export interface ProcessAssemble {
    control: OrbitControls;
    config: OrbitControlsConfig;
}
export declare class OrbitControlsProcessor extends Processor {
    config?: OrbitControlsConfig;
    target?: OrbitControls;
    constructor();
    assemble(params: ProcessAssemble): this;
    process(params: Process): this;
    dispose(): this;
}
