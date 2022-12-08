import { BufferGeometry } from "three";
import { DataSupport } from "../../core/DataSupport";
import { MODULETYPE } from "../constants/MODULETYPE";
import { GeometryCompiler } from "./GeometryCompiler";
import { GeometryAllType } from "./GeometryInterface";
export declare class GeometryDataSupport extends DataSupport<GeometryAllType, BufferGeometry, GeometryCompiler> {
    MODULE: MODULETYPE;
    constructor(data?: Array<GeometryAllType>);
}
