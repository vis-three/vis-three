import { Points } from "three";
import { MODULETYPE } from "../constants/MODULETYPE";
import { SolidObjectCompiler } from "../solidObject/SolidObjectCompiler";
import { PointsConfig } from "./PointsConfig";
export declare class PointsCompiler extends SolidObjectCompiler<PointsConfig, Points> {
    MODULE: MODULETYPE;
    constructor();
}
