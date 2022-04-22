import { BufferGeometry, Line, Material } from "three";
import { SolidObjectCompiler, SolidObjectCompilerParameters, SolidObjectCompilerTarget } from "../solidObject/SolidObjectCompiler";
import { LineConfig } from "./LineConfig";
export interface LineCompilerTarget extends SolidObjectCompilerTarget<LineConfig> {
    [key: string]: LineConfig;
}
export declare type LineCompilerParameters = SolidObjectCompilerParameters<LineConfig, LineCompilerTarget>;
export declare class LineCompiler extends SolidObjectCompiler<LineConfig, LineCompilerTarget, Line> {
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
