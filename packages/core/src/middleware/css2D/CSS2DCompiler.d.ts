import { VisCSS2DObject } from "../../optimize/VisCSS2DObject";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectCompiler } from "../object/ObjectCompiler";
import { CSS2DAllType } from "./CSS2DConfig";
export declare class CSS2DCompiler extends ObjectCompiler<CSS2DAllType, VisCSS2DObject> {
    MODULE: MODULETYPE;
    constructor();
}
