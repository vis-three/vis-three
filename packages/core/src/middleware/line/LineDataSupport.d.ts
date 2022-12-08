import { Line } from "three";
import { MODULETYPE } from "../constants/MODULETYPE";
import { SolidObjectDataSupport } from "../solidObject/SolidDataSupport";
import { LineCompiler } from "./LineCompiler";
import { LineConfig } from "./LineConfig";
export declare class LineDataSupport extends SolidObjectDataSupport<LineConfig, Line, LineCompiler> {
    MODULE: MODULETYPE;
    constructor(data?: Array<LineConfig>);
}
