import { Line } from "three";
import { IgnoreAttribute } from "../../core/ProxyBroadcast";
import { MODULETYPE } from "../constants/MODULETYPE";
import { SolidObjectDataSupport } from "../solidObject/SolidDataSupport";
import { LineCompiler, LineCompilerTarget } from "./LineCompiler";
import { LineConfig } from "./LineConfig";
import { LineRule } from "./LineRule";
export declare class LineDataSupport extends SolidObjectDataSupport<LineRule, LineCompiler, LineConfig, LineCompilerTarget, Line> {
    MODULE: MODULETYPE;
    constructor(data?: LineCompilerTarget, ignore?: IgnoreAttribute);
}
