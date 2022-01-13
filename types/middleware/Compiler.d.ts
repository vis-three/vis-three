import { BaseEvent, EventDispatcher, Object3D } from "three";
import { SymbolConfig } from "../case/common/CommonConfig";
export interface CompilerTarget {
    [key: string]: SymbolConfig;
}
export declare enum COMPILEREVENTTYPE {
    ADD = "add",
    REMOVE = "remove"
}
export interface CompilerAddEvent extends BaseEvent {
    type: COMPILEREVENTTYPE.ADD;
    object: Object3D;
    vid: string;
}
export interface ObjectCompiler {
    add: Function;
    remove: Function;
}
export declare abstract class Compiler extends EventDispatcher {
    static applyConfig<C extends SymbolConfig, O>(config: C, object: O, callBack?: Function): void;
    constructor();
    abstract setTarget(parameter: unknown): this;
    abstract compileAll(): this;
    abstract dispose(parameter: unknown): this;
}
