import { BufferGeometry } from "three";
import { Compiler, CompilerTarget } from "../../core/Compiler";
import { GeometryAllType } from "./GeometryInterface";
import { MODULETYPE } from "../constants/MODULETYPE";
export interface GeometryCompilerTarget extends CompilerTarget<GeometryAllType> {
}
export declare class GeometryCompiler extends Compiler<GeometryAllType, GeometryCompilerTarget, BufferGeometry> {
    MODULE: MODULETYPE;
    constructor();
}
