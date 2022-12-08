import { VisCSS2DObject } from "../../optimize/VisCSS2DObject";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectDataSupport } from "../object/ObjectDataSupport";
import { CSS2DCompiler } from "./CSS2DCompiler";
import { CSS2DAllType } from "./CSS2DConfig";
export declare class CSS2DDataSupport extends ObjectDataSupport<CSS2DAllType, VisCSS2DObject, CSS2DCompiler> {
    MODULE: MODULETYPE;
    constructor(data?: Array<CSS2DAllType>);
}
