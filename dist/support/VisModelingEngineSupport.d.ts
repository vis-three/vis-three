import { VisModelingEngine } from "../engine.case/VisModelingEngine";
import { VisLightCompiler, VisLightCompileTarget } from "../visCompiler/VisLightCompiler";
import { VisDataSupport } from "./visDataSupport/VisDataSupport";
export interface VisVueModelingEngineSupportParameters {
    dom?: HTMLElement;
    lightDataSupport: VisDataSupport<VisLightCompileTarget, VisLightCompiler>;
}
export declare class VisVueModelingEngineSupport {
    private engine;
    private loadManager;
    private resourceManager;
    constructor(parameters: VisVueModelingEngineSupportParameters);
    getEngine(): VisModelingEngine;
    load(urlList: string[]): void;
}
//# sourceMappingURL=VisModelingEngineSupport.d.ts.map