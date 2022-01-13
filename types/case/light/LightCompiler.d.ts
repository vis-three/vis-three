import { Light, Scene } from "three";
import { Compiler, CompilerTarget, ObjectCompiler } from "../../middleware/Compiler";
import { SymbolConfig } from "../common/CommonConfig";
import { PointLightConfig, SpotLightConfig } from "./LightConfig";
export interface LightCompilerTarget extends CompilerTarget {
    [key: string]: SpotLightConfig | PointLightConfig;
}
export interface LightCompilerParameters {
    scene: Scene;
    target: LightCompilerTarget;
}
export declare class LightCompiler extends Compiler implements ObjectCompiler {
    private scene;
    private target;
    private map;
    private constructMap;
    constructor(parameters: LightCompilerParameters);
    add(vid: string, config: SpotLightConfig | PointLightConfig): void;
    set(path: string[], key: string, value: any): void;
    remove(): void;
    setTarget(target: LightCompilerTarget): this;
    getMap(): Map<SymbolConfig['type'], Light>;
    compileAll(): this;
    dispose(): this;
}
