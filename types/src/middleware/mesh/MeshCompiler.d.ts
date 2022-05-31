import { BufferGeometry, Material, Mesh } from "three";
import { MODULETYPE } from "../constants/MODULETYPE";
import { SolidObjectCompiler, SolidObjectCompilerTarget } from "../solidObject/SolidObjectCompiler";
import { MeshConfig } from "./MeshConfig";
export interface MeshCompilerTarget extends SolidObjectCompilerTarget<MeshConfig> {
    [key: string]: MeshConfig;
}
export declare class MeshCompiler extends SolidObjectCompiler<MeshConfig, MeshCompilerTarget, Mesh> {
    MODULE: MODULETYPE;
    private replaceMaterial;
    private replaceGeometry;
    constructor();
    getReplaceMaterial(): Material;
    getReplaceGeometry(): BufferGeometry;
    add(vid: string, config: MeshConfig): this;
    dispose(): this;
}
