import { Object3D, Scene, Vector3 } from "three";
import { Compiler, CompilerTarget } from "../../core/Compiler";
import { EngineSupport } from "../../main";
import { EVENTNAME, ObjectEvent } from "../../manager/EventManager";
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
export interface BasicEventConfig {
    name: string;
    desp: string;
}
export interface FilterAttribute {
    [key: string]: FilterAttribute | boolean;
}
export declare type EventHandler<C extends BasicEventConfig> = (compiler: BasicObjectCompiler, config: C) => (event?: ObjectEvent) => void;
export declare abstract class ObjectCompiler<C extends ObjectConfig, T extends ObjectCompilerTarget<C>, O extends Object3D> extends Compiler {
    static eventLibrary: {
        [key: string]: EventHandler<BasicEventConfig>;
    };
    static eventSymbol: string;
    IS_OBJECTCOMPILER: boolean;
    abstract COMPILER_NAME: string;
    protected scene: Scene;
    protected target: T;
    protected map: Map<SymbolConfig["vid"], O>;
    protected weakMap: WeakMap<O, SymbolConfig["vid"]>;
    protected objectCacheMap: WeakMap<O, CacheObjectData>;
    protected objectMapSet: Set<Map<SymbolConfig["vid"], Object3D>>;
    private filterAttribute;
    engine: EngineSupport;
    constructor(parameters?: ObjectCompilerParameters<C, T>);
    getObject(vid: string): Object3D | null;
    protected mergeFilterAttribute(object: FilterAttribute): this;
    protected setLookAt(vid: string, target: string): this;
    protected addEvent(vid: string, eventName: EVENTNAME, config: BasicEventConfig): this;
    protected removeEvent(vid: string, eventName: EVENTNAME, index: number): this;
    protected updateEvent(vid: string, eventName: EVENTNAME, index: number): this;
    linkObjectMap(...map: Map<SymbolConfig["vid"], Object3D>[]): this;
    useEngine(engine: EngineSupport): this;
    setTarget(target: T): this;
    getMap(): Map<SymbolConfig["type"], Object3D>;
    getObjectSymbol(object: O): SymbolConfig["vid"] | null;
    compileAll(): this;
    remove(vid: string): this;
    dispose(): this;
    add(vid: string, config: T[string]): this;
    set(vid: string, path: string[], key: string, value: any): this;
}
