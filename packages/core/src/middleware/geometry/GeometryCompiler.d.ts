import { BufferGeometry } from "three";
import { Compiler } from "../../core/Compiler";
import { GeometryAllType } from "./GeometryInterface";
import { MODULETYPE } from "../constants/MODULETYPE";
export declare class GeometryCompiler extends Compiler<GeometryAllType, BufferGeometry> {
    MODULE: MODULETYPE;
    constructor();
}
