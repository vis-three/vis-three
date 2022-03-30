import { DataSupport } from "../../core/DataSupport";
import { MODULETYPE } from "../constants/MODULETYPE";
import { GeometryCompiler, GeometryCompilerTarget } from "./GeometryCompiler";
export declare class GeometryDataSupport extends DataSupport<GeometryCompilerTarget, GeometryCompiler> {
    MODULE: MODULETYPE;
    constructor(data?: GeometryCompilerTarget);
}
