import { BufferGeometry, Line, Material } from "three";
import { ObjectCompiler, ObjectCompilerParameters, ObjectCompilerTarget } from "../object/ObjectCompiler";
import { LineConfig } from "./LineConfig";
export interface LineCompilerTarget extends ObjectCompilerTarget<LineConfig> {
    [key: string]: LineConfig;
}
export declare type LineCompilerParameters = ObjectCompilerParameters<LineConfig, LineCompilerTarget>;
export declare class LineCompiler extends ObjectCompiler<LineConfig, LineCompilerTarget, Line> {
    COMPILER_NAME: string;
    private replaceMaterial;
    private replaceGeometry;
    constructor(parameters?: LineCompilerParameters);
    getReplaceMaterial(): Material;
    getReplaceGeometry(): BufferGeometry;
    add(vid: string, config: LineConfig): this;
    set(vid: string, path: string[], key: string, value: any): this;
    dispose(): this;
}
