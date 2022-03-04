import { Mesh } from "three";
import { ObjectDataSupport } from "../object/ObjectDataSupport";
import { MeshCompiler, MeshCompilerTarget } from "./MeshCompiler";
import { MeshConfig } from "./MeshConfig";
import { MeshRule } from "./MeshRule";
export declare class MeshDataSupport extends ObjectDataSupport<MeshRule, MeshCompiler, MeshConfig, MeshCompilerTarget, Mesh> {
    constructor(data?: MeshCompilerTarget);
}
