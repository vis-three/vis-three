import { Scene } from "three";
import { Compiler, CompilerTarget } from "../../middleware/Compiler";
import { PointLightConfig, SpotLightConfig } from "./LightConfig";
export interface LightCompilerTarget extends CompilerTarget {
    [key: string]: SpotLightConfig | PointLightConfig;
}
export interface LightCompilerParameters {
    scene: Scene;
    target: LightCompilerTarget;
}
export declare class LightCompiler extends Compiler {
    private scene;
    private target;
    private map;
    private constructMap;
    constructor(parameters: LightCompilerParameters);
    add(vid: string, config: SpotLightConfig | PointLightConfig): void;
    set(path: string[], key: string, value: any): void;
    setTarget(target: LightCompilerTarget): this;
    compileAll(): this;
    dispose(): this;
}
