import { Line } from "three";
import { MODULETYPE } from "../constants/MODULETYPE";
import { SolidObjectCompiler } from "../solidObject/SolidObjectCompiler";
import { LineConfig } from "./LineConfig";
export declare class LineCompiler extends SolidObjectCompiler<LineConfig, Line> {
    MODULE: MODULETYPE;
    constructor();
}
