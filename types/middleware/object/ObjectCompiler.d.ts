import { BufferGeometry, Material, Object3D, Scene, Vector3 } from "three";
import { Compiler, CompilerTarget } from "../../core/Compiler";
import { SymbolConfig } from "../common/CommonConfig";
import { ObjectConfig } from "./ObjectConfig";
export declare type BasicObjectCompiler = ObjectCompiler<ObjectConfig, ObjectCompilerTarget<ObjectConfig>, Object3D>;
export interface ObjectCompilerTarget<C extends ObjectConfig> extends CompilerTarget {
    [key: string]: C;
}
export interface ObjectCompilerParameters<C extends ObjectConfig, T extends ObjectCompilerTarget<C>> {
    scene?: Scene;
    target?: T;
}
export interface CacheObjectData {
    lookAtTarget: Vector3 | null;
    updateMatrixWorldFun: ((focus: boolean) => void) | null;
}
export declare abstract class ObjectCompiler<C extends ObjectConfig, T extends ObjectCompilerTarget<C>, O extends Object3D> extends Compiler {
    IS_OBJECTCOMPILER: boolean;
    abstract COMPILER_NAME: string;
    protected scene: Scene;
    protected target: T;
    protected map: Map<SymbolConfig['vid'], O>;
    protected weakMap: WeakMap<O, SymbolConfig['vid']>;
    protected cacheObjectMap: WeakMap<O, CacheObjectData>;
    protected geometryMap: Map<SymbolConfig['vid'], BufferGeometry>;
    protected materialMap: Map<SymbolConfig['vid'], Material>;
    protected objectMapSet: Set<Map<SymbolConfig['vid'], Object3D>>;
    constructor(parameters?: ObjectCompilerParameters<C, T>);
    protected getMaterial(vid: string): Material;
    protected getGeometry(vid: string): BufferGeometry;
    protected getObject(vid: string): Object3D | null;
    protected setLookAt(vid: string, target: string): this;
    linkGeometryMap(map: Map<SymbolConfig['vid'], BufferGeometry>): this;
    linkMaterialMap(materialMap: Map<string, Material>): this;
    linkObjectMap(...map: Map<SymbolConfig['vid'], Object3D>[]): this;
    setScene(scene: Scene): this;
    setTarget(target: T): this;
    getMap(): Map<SymbolConfig['type'], Object3D>;
    getObjectSymbol(object: O): SymbolConfig['vid'] | null;
    compileAll(): this;
    remove(vid: string): this;
    dispose(): this;
    abstract getReplaceMaterial(): Material;
    abstract getReplaceGeometry(): BufferGeometry;
    abstract add(vid: string, config: T[string]): this;
    abstract set(vid: string, path: string[], key: string, value: any): this;
}
