import { BufferGeometry, Material, Mesh } from "three";
import { ObjectCompiler, ObjectCompilerParameters, ObjectCompilerTarget } from "../object/ObjectCompiler";
import { MeshConfig } from "./MeshConfig";
export interface MeshCompilerTarget extends ObjectCompilerTarget<MeshConfig> {
    [key: string]: MeshConfig;
}
export interface MeshCompilerParameters extends ObjectCompilerParameters<MeshConfig, MeshCompilerTarget> {
}
export declare class MeshCompiler extends ObjectCompiler<MeshConfig, MeshCompilerTarget, Mesh> {
    COMPILER_NAME: string;
    private replaceMaterial;
    private replaceGeometry;
    constructor(parameters?: MeshCompilerParameters);
    getReplaceMaterial(): Material;
    getReplaceGeometry(): BufferGeometry;
    add(vid: string, config: MeshConfig): this;
    set(vid: string, path: string[], key: string, value: any): this;
    dispose(): this;
}
