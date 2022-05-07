import { DataSupport } from "../../core/DataSupport";
import { IgnoreAttribute } from "../../core/ProxyBroadcast";
import { MODULETYPE } from "../constants/MODULETYPE";
import { GeometryCompiler, GeometryCompilerTarget } from "./GeometryCompiler";
export declare class GeometryDataSupport extends DataSupport<GeometryCompilerTarget, GeometryCompiler> {
    MODULE: MODULETYPE;
    constructor(data?: GeometryCompilerTarget, ignore?: IgnoreAttribute);
}
