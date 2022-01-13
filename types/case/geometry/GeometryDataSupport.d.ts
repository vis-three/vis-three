import { DataSupport } from "../../middleware/DataSupport";
import { GeometryCompiler, GeometryCompilerTarget } from "./GeometryCompiler";
export declare class GeometryDataSupport extends DataSupport<GeometryCompilerTarget, GeometryCompiler> {
    constructor(data?: GeometryCompilerTarget);
}
