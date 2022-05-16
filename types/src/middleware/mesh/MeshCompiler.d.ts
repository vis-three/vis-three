import { BufferGeometry, Material, Mesh } from "three";
import { SolidObjectCompiler, SolidObjectCompilerTarget } from "../solidObject/SolidObjectCompiler";
import { MeshConfig } from "./MeshConfig";
export interface MeshCompilerTarget extends SolidObjectCompilerTarget<MeshConfig> {
    [key: string]: MeshConfig;
}
export declare class MeshCompiler extends SolidObjectCompiler<MeshConfig, MeshCompilerTarget, Mesh> {
    COMPILER_NAME: string;
    private replaceMaterial;
    private replaceGeometry;
    constructor();
    getReplaceMaterial(): Material;
    getReplaceGeometry(): BufferGeometry;
    add(vid: string, config: MeshConfig): this;
    dispose(): this;
}
