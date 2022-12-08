import { Mesh } from "three";
import { MODULETYPE } from "../constants/MODULETYPE";
import { SolidObjectCompiler } from "../solidObject/SolidObjectCompiler";
import { MeshConfig } from "./MeshConfig";
export declare class MeshCompiler extends SolidObjectCompiler<MeshConfig, Mesh> {
    MODULE: MODULETYPE;
    constructor();
}
