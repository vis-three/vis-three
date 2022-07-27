import { BufferGeometry } from "three";
import { CompilerTarget } from "../../core/Compiler";
import { DataSupport } from "../../core/DataSupport";
import { IgnoreAttribute } from "../../core/ProxyBroadcast";
import { MODULETYPE } from "../constants/MODULETYPE";
import { GeometryCompiler } from "./GeometryCompiler";
import { GeometryAllType } from "./GeometryInterface";
export declare class GeometryDataSupport extends DataSupport<GeometryAllType, BufferGeometry, GeometryCompiler> {
    MODULE: MODULETYPE;
    constructor(data?: CompilerTarget<GeometryAllType>, ignore?: IgnoreAttribute);
}
