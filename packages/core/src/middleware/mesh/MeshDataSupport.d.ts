import { Mesh } from "three";
import { MODULETYPE } from "../constants/MODULETYPE";
import { SolidObjectDataSupport } from "../solidObject/SolidDataSupport";
import { MeshCompiler } from "./MeshCompiler";
import { MeshConfig } from "./MeshConfig";
export declare class MeshDataSupport extends SolidObjectDataSupport<MeshConfig, Mesh, MeshCompiler> {
    MODULE: MODULETYPE;
    constructor(data?: Array<MeshConfig>);
}
