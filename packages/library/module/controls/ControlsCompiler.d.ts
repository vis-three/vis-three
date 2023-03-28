import { Compiler, Processor } from "@vis-three/middleware";
import { ControlsConfig } from "./ControlsConfig";
export declare class ControlsCompiler extends Compiler<ControlsConfig, any> {
    constructor();
    reigstProcessor(processor: Processor<any, any, any, any>, fun: (compiler: Compiler<ControlsConfig, any>) => void): this;
}
