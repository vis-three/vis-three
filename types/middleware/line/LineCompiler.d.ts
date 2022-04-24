import { BufferGeometry, Line, Material } from "three";
import { SolidObjectCompiler, SolidObjectCompilerTarget } from "../solidObject/SolidObjectCompiler";
import { LineConfig } from "./LineConfig";
export interface LineCompilerTarget extends SolidObjectCompilerTarget<LineConfig> {
    [key: string]: LineConfig;
}
export declare class LineCompiler extends SolidObjectCompiler<LineConfig, LineCompilerTarget, Line> {
    COMPILER_NAME: string;
    private replaceMaterial;
    private replaceGeometry;
    constructor();
    getReplaceMaterial(): Material;
    getReplaceGeometry(): BufferGeometry;
    add(vid: string, config: LineConfig): this;
    dispose(): this;
}
