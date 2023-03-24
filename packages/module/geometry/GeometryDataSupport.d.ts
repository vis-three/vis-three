import { DataSupport } from "../module";
import { BufferGeometry } from "three";
import { MODULETYPE } from "../constants";
import { GeometryCompiler } from "./GeometryCompiler";
import { GeometryAllType } from "./GeometryInterface";
export declare class GeometryDataSupport extends DataSupport<GeometryAllType, BufferGeometry, GeometryCompiler> {
    MODULE: MODULETYPE;
    constructor(data?: Array<GeometryAllType>);
}
