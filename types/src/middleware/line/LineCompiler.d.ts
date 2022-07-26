import { Line } from "three";
import { MODULETYPE } from "../constants/MODULETYPE";
import { SolidObjectCompiler, SolidObjectCompilerTarget } from "../solidObject/SolidObjectCompiler";
import { LineConfig } from "./LineConfig";
export interface LineCompilerTarget extends SolidObjectCompilerTarget<LineConfig> {
}
export declare class LineCompiler extends SolidObjectCompiler<LineConfig, LineCompilerTarget, Line> {
    MODULE: MODULETYPE;
    constructor();
}
