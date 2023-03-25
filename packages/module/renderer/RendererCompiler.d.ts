import { Compiler, Processor } from "@vis-three/middleware";
import { RendererConfig } from "./RendererConfig";
export declare class RendererCompiler extends Compiler<any, any> {
    constructor();
    reigstProcessor(processor: Processor<any, any, any, any>, fun: (compiler: Compiler<RendererConfig, any>) => void): this;
}
