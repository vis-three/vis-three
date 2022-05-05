import { Object3D, Vector3 } from "three";
import { Compiler, CompilerTarget } from "../../core/Compiler";
import { EngineSupport } from "../../engine/EngineSupport";
import { BasicEventConfig } from "../../library/event/EventLibrary";
import { EVENTNAME } from "../../manager/EventManager";
import { SymbolConfig } from "../common/CommonConfig";
import { ObjectConfig } from "./ObjectConfig";
export declare type BasicObjectCompiler = ObjectCompiler<ObjectConfig, ObjectCompilerTarget<ObjectConfig>, Object3D>;
export interface ObjectCompilerTarget<C extends ObjectConfig> extends CompilerTarget {
    [key: string]: C;
}
export interface CacheObjectData {
    lookAtTarget: Vector3 | null;
    updateMatrixWorldFun: ((focus: boolean) => void) | null;
}
export interface FilterAttribute {
    [key: string]: FilterAttribute | boolean;
}
export declare abstract class ObjectCompiler<C extends ObjectConfig, T extends ObjectCompilerTarget<C>, O extends Object3D> extends Compiler {
    static eventSymbol: string;
    IS_OBJECTCOMPILER: boolean;
    abstract COMPILER_NAME: string;
    protected target: T;
    protected map: Map<SymbolConfig["vid"], O>;
    protected weakMap: WeakMap<O, SymbolConfig["vid"]>;
    protected objectCacheMap: WeakMap<O, CacheObjectData>;
    protected objectMapSet: Set<Map<SymbolConfig["vid"], Object3D>>;
    protected filterAttribute: FilterAttribute;
    engine: EngineSupport;
    constructor();
    getObject(vid: string): Object3D | null;
    protected mergeFilterAttribute(object: FilterAttribute): this;
    protected setLookAt(vid: string, target: string): this;
    addEvent(vid: string, eventName: EVENTNAME, config: BasicEventConfig): this;
    removeEvent(vid: string, eventName: EVENTNAME, index: number): this;
    updateEvent(vid: string, eventName: EVENTNAME, index: number): this;
    addChildren(vid: string, target: string): this;
    removeChildren(vid: string, target: string): this;
    linkObjectMap(...map: Map<SymbolConfig["vid"], Object3D>[]): this;
    useEngine(engine: EngineSupport): this;
    setTarget(target: T): this;
    getMap(): Map<SymbolConfig["type"], Object3D>;
    getObjectSymbol(object: O): SymbolConfig["vid"] | null;
    compileAll(): this;
    add(vid: string, config: T[string]): this;
    set(vid: string, path: string[], key: string, value: any): this;
    cover(vid: string, config: T[string]): this;
    remove(vid: string): this;
    dispose(): this;
}
