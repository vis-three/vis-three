import { BufferGeometry, Line, Material } from "three";
import { MeshConfig } from "../mesh/MeshConfig";
import { ObjectCompiler, ObjectCompilerParameters, ObjectCompilerTarget } from "../object/ObjectCompiler";
import { LineConfig } from "./LineConfig";
export interface LineCompilerTarget extends ObjectCompilerTarget<LineConfig> {
    [key: string]: MeshConfig;
}
export interface LineCompilerParameters extends ObjectCompilerParameters<LineConfig, LineCompilerTarget> {
}
export declare class LineCompiler extends ObjectCompiler<LineConfig, LineCompilerTarget, Line> {
    COMPILER_NAME: string;
    private replaceMaterial;
    private replaceGeometry;
    constructor(parameters?: LineCompilerParameters);
    getReplaceMaterial(): Material;
    getReplaceGeometry(): BufferGeometry;
    add(vid: string, config: MeshConfig): this;
    set(vid: string, path: string[], key: string, value: any): this;
    dispose(): this;
}
