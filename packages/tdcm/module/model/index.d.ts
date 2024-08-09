import { EventDispatcher } from "@vis-three/core";
import { BasicConfig } from "../common";
import { EngineSupport } from "../../engine";
import { CtnNotice } from "../container";
import { DeepIntersection, DeepPartial, DeepRecord, DeepUnion } from "@vis-three/utils";
import { Compiler } from "../compiler";
export type RegCommand<C extends BasicConfig = BasicConfig, P extends object = object, E extends EngineSupport = EngineSupport> = {
    reg: RegExp;
    handler: (this: Model<C, P, E>, params: CtnNotice) => void;
};
export type KeyCommand<C extends BasicConfig = BasicConfig, P extends object = object, E extends EngineSupport = EngineSupport> = (this: Model<C, P, E>, params: CtnNotice) => void;
export type CommandStructure<C extends BasicConfig = BasicConfig, P extends object = object, E extends EngineSupport = EngineSupport> = DeepIntersection<DeepPartial<DeepRecord<DeepUnion<C, KeyCommand<C, P, E>>, KeyCommand<C, P, E>>>, {
    $reg?: RegCommand<C, P, E>[];
}>;
export interface ModelCommands<C extends BasicConfig = BasicConfig, P extends object = object, E extends EngineSupport = EngineSupport> {
    add?: CommandStructure<C, P, E>;
    set?: CommandStructure<C, P, E>;
    delete?: CommandStructure<C, P, E>;
}
export interface ModelParameters<C extends BasicConfig = BasicConfig, P extends object = object, E extends EngineSupport = EngineSupport> {
    config: C;
    engine: E;
    compiler: Compiler<E, Model<C, P, E>>;
}
export declare abstract class Model<C extends BasicConfig = BasicConfig, P extends object = object, E extends EngineSupport = EngineSupport> extends EventDispatcher {
    puppet: P;
    config: C;
    engine: E;
    compiler: Compiler<E, Model<C, P, E>>;
    abstract commands?: ModelCommands<C, P, E>;
    constructor(params: ModelParameters<C, P, E>);
    abstract create: () => void;
    abstract dispose: () => void;
    process(params: CtnNotice): void;
    private add;
    private set;
    private delete;
    beforeCreate(): void;
    disposed(): void;
}
export interface ModelOption<B extends BasicConfig = BasicConfig, P extends object = object, E extends EngineSupport = EngineSupport, C extends Model<B, P, E> = Model<B, P, E>> {
    type: string;
    config: B;
    model: new () => C;
}
export declare const defineModel: <B extends BasicConfig = BasicConfig, P extends object = object, E extends EngineSupport = EngineSupport, C extends Model<B, P, E> = Model<B, P, E>>(option: ModelOption<B, P, E, C>) => ModelOption<B, P, E, C>;
/**
 * @deprecated use defineModel
 */
export declare const defineProcessor: <B extends BasicConfig = BasicConfig, P extends object = object, E extends EngineSupport = EngineSupport, C extends Model<B, P, E> = Model<B, P, E>>(option: ModelOption<B, P, E, C>) => ModelOption<B, P, E, C>;
