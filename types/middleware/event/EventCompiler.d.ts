import { Compiler, CompilerTarget } from "../../core/Compiler";
import { EventConfig } from "./eventConfig";
import { SymbolConfig } from "../common/CommonConfig";
import { Object3D } from "three";
import { EVENTNAME, ObjectEvent } from "../../manager/EventManager";
import { EngineSupport } from "../../engine/EngineSupport";
export declare type EventHandler<C extends BasicEventConfig> = (compiler: EventCompiler, config: C) => (event?: ObjectEvent) => void;
export interface BasicEventConfig {
    name: string;
    desp: string;
}
export interface EventCompilerTarget extends CompilerTarget {
    [key: string]: EventConfig;
}
export interface EventCompilerParameters {
    target: EventCompilerTarget;
    engine: EngineSupport;
}
export declare class EventCompiler extends Compiler {
    static eventLibrary: {
        [key: string]: EventHandler<BasicEventConfig>;
    };
    static registerEvent: (map: unknown) => void;
    engine: EngineSupport;
    private target;
    private map;
    private funMap;
    private objectMapSet;
    constructor(parameters?: EventCompilerParameters);
    getObject(vid: string): Object3D | null;
    private getTargetObject;
    linkObjectMap(...map: Map<SymbolConfig['vid'], Object3D>[]): this;
    add(vid: string, config: EventConfig): this;
    addEvent(vid: string, eventName: EVENTNAME, config: BasicEventConfig): this;
    removeEvent(vid: string, eventName: EVENTNAME, index: number): this;
    updateEvent(vid: string, eventName: EVENTNAME, index: number): void;
    remove(vid: string): this;
    setTarget(target: EventCompilerTarget): this;
    compileAll(): this;
    dispose(): this;
}
