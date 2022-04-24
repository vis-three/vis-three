import { BufferGeometry, Material, Mesh, Object3D } from "three";
import { SymbolConfig } from "../common/CommonConfig";
import { ObjectCompiler, ObjectCompilerParameters, ObjectCompilerTarget } from "../object/ObjectCompiler";
import { SolidObjectConfig } from "./SolidObjectConfig";
export interface SolidObject3D extends Object3D {
    material: Mesh["material"];
    geometry: Mesh["geometry"];
}
export declare type BasicSolidObjectCompiler = SolidObjectCompiler<SolidObjectConfig, SolidObjectCompilerTarget<SolidObjectConfig>, SolidObject3D>;
export interface SolidObjectCompilerTarget<C extends SolidObjectConfig> extends ObjectCompilerTarget<C> {
    [key: string]: C;
}
export interface SolidObjectCompilerParameters<C extends SolidObjectConfig, T extends SolidObjectCompilerTarget<C>> extends ObjectCompilerParameters<C, T> {
    target?: T;
}
export declare abstract class SolidObjectCompiler<C extends SolidObjectConfig, T extends SolidObjectCompilerTarget<C>, O extends SolidObject3D> extends ObjectCompiler<C, T, O> {
    IS_SOLIDOBJECTCOMPILER: boolean;
    protected geometryMap: Map<SymbolConfig["vid"], BufferGeometry>;
    protected materialMap: Map<SymbolConfig["vid"], Material>;
    constructor(parameters?: SolidObjectCompilerParameters<C, T>);
    protected getMaterial(vid: string): Material;
    protected getGeometry(vid: string): BufferGeometry;
    linkGeometryMap(map: Map<SymbolConfig["vid"], BufferGeometry>): this;
    linkMaterialMap(materialMap: Map<string, Material>): this;
    add(vid: string, config: T[string]): this;
    set(vid: string, path: string[], key: string, value: any): this;
    abstract getReplaceMaterial(): Material;
    abstract getReplaceGeometry(): BufferGeometry;
}
