import { Mesh } from "three";
import { MODULETYPE } from "../constants/MODULETYPE";
import { SolidObjectCompiler, SolidObjectCompilerTarget } from "../solidObject/SolidObjectCompiler";
import { MeshConfig } from "./MeshConfig";
export interface MeshCompilerTarget extends SolidObjectCompilerTarget<MeshConfig> {
}
export declare class MeshCompiler extends SolidObjectCompiler<MeshConfig, MeshCompilerTarget, Mesh> {
    MODULE: MODULETYPE;
    constructor();
}
