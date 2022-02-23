import { BufferGeometry, Material, Object3D, Scene } from "three";
import { Compiler, CompilerTarget } from "../../core/Compiler";
import { SymbolConfig } from "../common/CommonConfig";
import { ObjectConfig } from "./ObjectConfig";
export interface ObjectCompilerTarget extends CompilerTarget {
    [key: string]: ObjectConfig;
}
export interface ObjectCompilerParameters<T extends ObjectCompilerTarget> {
    scene?: Scene;
    target?: T;
}
export declare abstract class ObjectCompiler<O extends Object3D, T extends ObjectCompilerTarget> extends Compiler {
    IS_OBJECTCOMPILER: boolean;
    private scene;
    private target;
    private map;
    private weakMap;
    protected geometryMap: Map<SymbolConfig['vid'], BufferGeometry>;
    protected materialMap: Map<SymbolConfig['vid'], Material>;
    protected objectMapSet: Set<Map<SymbolConfig['vid'], Object3D>>;
    constructor(parameters: ObjectCompilerParameters<T>);
    protected getMaterial(vid: string): Material;
    protected getGeometry(vid: string): BufferGeometry;
    linkGeometryMap(map: Map<SymbolConfig['vid'], BufferGeometry>): this;
    linkMaterialMap(materialMap: Map<string, Material>): this;
    linkObjectMap(map: Map<SymbolConfig['vid'], Object3D>): this;
    setScene(scene: Scene): this;
    setTarget(target: T): this;
    getMap(): Map<SymbolConfig['type'], Object3D>;
    compileAll(): this;
    dispose(): this;
    abstract getReplaceMaterial(): Material;
    abstract getReplaceGeometry(): BufferGeometry;
    abstract add(vid: string, config: T[string]): this;
    abstract remove(vid: string): this;
    abstract set(vid: string, path: string[], key: string, value: any): this;
}
