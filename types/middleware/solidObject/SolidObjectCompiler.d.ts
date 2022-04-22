import { BufferGeometry, Material, Object3D } from "three";
import { SymbolConfig } from "../common/CommonConfig";
import { ObjectCompiler, ObjectCompilerParameters, ObjectCompilerTarget } from "../object/ObjectCompiler";
import { SolidObjectConfig } from "./SolidObjectConfig";
export declare type BasicSolidObjectCompiler = SolidObjectCompiler<SolidObjectConfig, SolidObjectCompilerTarget<SolidObjectConfig>, Object3D>;
export interface SolidObjectCompilerTarget<C extends SolidObjectConfig> extends ObjectCompilerTarget<C> {
    [key: string]: C;
}
export interface SolidObjectCompilerParameters<C extends SolidObjectConfig, T extends SolidObjectCompilerTarget<C>> extends ObjectCompilerParameters<C, T> {
    target?: T;
}
export declare abstract class SolidObjectCompiler<C extends SolidObjectConfig, T extends SolidObjectCompilerTarget<C>, O extends Object3D> extends ObjectCompiler<C, T, O> {
    IS_SOLIDOBJECTCOMPILER: boolean;
    protected geometryMap: Map<SymbolConfig["vid"], BufferGeometry>;
    protected materialMap: Map<SymbolConfig["vid"], Material>;
    constructor(parameters?: SolidObjectCompilerParameters<C, T>);
    protected getMaterial(vid: string): Material;
    protected getGeometry(vid: string): BufferGeometry;
    linkGeometryMap(map: Map<SymbolConfig["vid"], BufferGeometry>): this;
    linkMaterialMap(materialMap: Map<string, Material>): this;
    abstract getReplaceMaterial(): Material;
    abstract getReplaceGeometry(): BufferGeometry;
}
