import { Mesh } from "three";
import { IgnoreAttribute } from "../../core/ProxyBroadcast";
import { MODULETYPE } from "../constants/MODULETYPE";
import { SolidObjectDataSupport } from "../solidObject/SolidDataSupport";
import { MeshCompiler, MeshCompilerTarget } from "./MeshCompiler";
import { MeshConfig } from "./MeshConfig";
import { MeshRule } from "./MeshRule";
export declare class MeshDataSupport extends SolidObjectDataSupport<MeshRule, MeshCompiler, MeshConfig, MeshCompilerTarget, Mesh> {
    MODULE: MODULETYPE;
    constructor(data?: MeshCompilerTarget, ignore?: IgnoreAttribute);
}
