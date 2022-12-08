import { Points } from "three";
import { MODULETYPE } from "../constants/MODULETYPE";
import { SolidObjectDataSupport } from "../solidObject/SolidDataSupport";
import { PointsCompiler } from "./PointsCompiler";
import { PointsConfig } from "./PointsConfig";
export declare class PointsDataSupport extends SolidObjectDataSupport<PointsConfig, Points, PointsCompiler> {
    MODULE: MODULETYPE;
    constructor(data?: Array<PointsConfig>);
}
