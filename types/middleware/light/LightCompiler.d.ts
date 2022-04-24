import { Light } from "three";
import { LightConfigAllType } from "./LightConfig";
import { ObjectCompiler, ObjectCompilerParameters, ObjectCompilerTarget } from "../object/ObjectCompiler";
export interface LightCompilerTarget extends ObjectCompilerTarget<LightConfigAllType> {
    [key: string]: LightConfigAllType;
}
export declare type LightCompilerParameters = ObjectCompilerParameters<LightConfigAllType, LightCompilerTarget>;
export declare class LightCompiler extends ObjectCompiler<LightConfigAllType, LightCompilerTarget, Light> {
    COMPILER_NAME: string;
    private constructMap;
    constructor(parameters?: LightCompilerParameters);
    protected setLookAt(vid: string, target: string): this;
    add(vid: string, config: LightConfigAllType): this;
    set(vid: string, path: string[], key: string, value: any): this;
    dispose(): this;
}
