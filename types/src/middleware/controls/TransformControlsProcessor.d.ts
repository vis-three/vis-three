import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { Process, Processor } from "../../core/Processor";
import { TransformControlsConfig } from "./ControlsConfig";
export interface ProcessAssemble {
    control: TransformControls;
    config: TransformControlsConfig;
}
export declare class TransformControlsProcessor extends Processor {
    config?: TransformControlsConfig;
    target?: TransformControls;
    filterMap: {
        translationSnap: boolean;
        rotationSnap: boolean;
        scaleSnap: boolean;
    };
    constructor();
    assemble(params: ProcessAssemble): this;
    process(params: Process): this;
    dispose(): this;
    private snapAllow;
}
