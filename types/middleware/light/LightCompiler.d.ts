import { BufferGeometry, Light, Material } from "three";
import { LightConfigAllType } from "./LightConfig";
import { ObjectCompiler, ObjectCompilerParameters, ObjectCompilerTarget } from "../object/ObjectCompiler";
export interface LightCompilerTarget extends ObjectCompilerTarget<LightConfigAllType> {
    [key: string]: LightConfigAllType;
}
export interface LightCompilerParameters extends ObjectCompilerParameters<LightConfigAllType, LightCompilerTarget> {
}
export declare class LightCompiler extends ObjectCompiler<LightConfigAllType, LightCompilerTarget, Light> {
    COMPILER_NAME: string;
    private constructMap;
    private filterAttribute;
    private replaceMaterial;
    private replaceGeometry;
    constructor(parameters?: LightCompilerParameters);
    getReplaceMaterial(): Material;
    getReplaceGeometry(): BufferGeometry;
    add(vid: string, config: LightConfigAllType): this;
    set(vid: string, path: string[], key: string, value: any): this;
    dispose(): this;
}
