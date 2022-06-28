import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Process, Processor } from "../../core/Processor";
import { EngineSupport } from "../../engine/EngineSupport";
import { Vector3Config } from "../common/CommonConfig";
import { OrbitControlsConfig } from "./ControlsConfig";
export interface ProcessAssemble {
    control: OrbitControls;
    config: OrbitControlsConfig;
    engine: EngineSupport;
}
export declare class OrbitControlsProcessor extends Processor {
    config?: OrbitControlsConfig;
    target?: OrbitControls;
    engine?: EngineSupport;
    constructor();
    assemble(params: ProcessAssemble): this;
    process(params: Process): this;
    setTarget(target: Vector3Config | string | null): void;
    dispose(): this;
}
