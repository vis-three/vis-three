import { EventDispatcher } from "@vis-three/core";
import { BasicConfig } from "../common";
import { EngineSupport } from "../../engine";
import { CtnNotice } from "../container";
import { DeepIntersection, DeepPartial, DeepRecord, DeepUnion } from "@vis-three/utils";
import { Compiler } from "../compiler";
export interface CommandParameters<C extends BasicConfig = BasicConfig, P extends object = object, E extends EngineSupport = EngineSupport, O extends Compiler<E> = Compiler<E>, M extends Model<C, P, E, O> = Model<C, P, E, O>> extends CtnNotice {
    model: M;
    ctx: M;
    puppet: P;
    target: P;
    config: C;
    engine: E;
    compiler: O;
}
export type RegCommand<C extends BasicConfig = BasicConfig, P extends object = object, E extends EngineSupport = EngineSupport, O extends Compiler<E> = Compiler<E>, M extends Model<C, P, E, O> = Model<C, P, E, O>> = {
    reg: RegExp;
    handler: (this: M, params: CommandParameters<C, P, E, O, M>) => void;
};
export type KeyCommand<C extends BasicConfig = BasicConfig, P extends object = object, E extends EngineSupport = EngineSupport, O extends Compiler<E> = Compiler<E>, M extends Model<C, P, E, O> = Model<C, P, E, O>> = (this: M, params: CommandParameters<C, P, E, O, M>) => void;
export type CommandStructure<C extends BasicConfig = BasicConfig, P extends object = object, E extends EngineSupport = EngineSupport, O extends Compiler<E> = Compiler<E>, M extends Model<C, P, E, O> = Model<C, P, E, O>> = DeepIntersection<DeepPartial<DeepRecord<DeepUnion<C, KeyCommand<C, P, E, O, M>>, KeyCommand<C, P, E, O, M>>>, {
    $reg?: RegCommand<C, P, E, O, M>[];
}>;
export interface ModelCommands<C extends BasicConfig = BasicConfig, P extends object = object, E extends EngineSupport = EngineSupport, O extends Compiler<E> = Compiler<E>, M extends Model<C, P, E, O> = Model<C, P, E, O>> {
    add?: CommandStructure<C, P, E, O, M>;
    set?: CommandStructure<C, P, E, O, M>;
    delete?: CommandStructure<C, P, E, O, M>;
}
export interface ModelParameters<C extends BasicConfig = BasicConfig, P extends object = object, E extends EngineSupport = EngineSupport, O extends Compiler<E> = Compiler<E>> {
    config: C;
    engine: E;
    compiler: O;
}
export declare class Model<C extends BasicConfig = BasicConfig, P extends object = object, E extends EngineSupport = EngineSupport, O extends Compiler<E> = Compiler<E>> extends EventDispatcher {
    puppet: P;
    config: C;
    engine: E;
    compiler: O;
    commands?: ModelCommands<C, P, E, O>;
    createPuppet: (this: any, params: {
        model: any;
        config: C;
        engine: E;
        compiler: O;
    }) => P;
    disposePuppet: (this: any, params: {
        model: any;
        target: P;
        puppet: P;
        config: C;
        engine: E;
        compiler: O;
    }) => void;
    constructor(params: ModelParameters<C, P, E, O>);
    toConfig<CO extends BasicConfig>(vid: string): CO | null;
    toModel<MO extends Model<any, any, any>>(vid: string): MO | null;
    toObject<OB extends object>(vid: string): OB;
    toPuppet<OB extends object>(vid: string): OB;
    toAsync(fun: (finish: boolean) => boolean): void;
    asyncNextTick(fun: () => boolean): void;
    toTrigger(name: string, fun: (immediate: boolean) => boolean): void;
    process(params: CtnNotice): void;
    private add;
    private set;
    private delete;
    create(): void;
    dispose(): void;
}
