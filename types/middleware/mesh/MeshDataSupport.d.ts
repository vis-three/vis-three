import { Mesh } from "three";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectDataSupport } from "../object/ObjectDataSupport";
import { MeshCompiler, MeshCompilerTarget } from "./MeshCompiler";
import { MeshConfig } from "./MeshConfig";
import { MeshRule } from "./MeshRule";
export declare class MeshDataSupport extends ObjectDataSupport<MeshRule, MeshCompiler, MeshConfig, MeshCompilerTarget, Mesh> {
    MODULE: MODULETYPE;
    constructor(data?: MeshCompilerTarget);
}
