import { EventDispatcher } from "@vis-three/core";
import { BasicConfig } from "../common";
import { EngineSupport } from "../../engine";
import { CtnNotice } from "../container";
import { DeepIntersection, DeepPartial, DeepRecord, DeepUnion } from "@vis-three/utils";
import { Compiler } from "../compiler";
export interface ModelNotice extends Omit<CtnNotice, "path"> {
    path: string[];
}
export interface CommandParameters<C extends BasicConfig = BasicConfig, P extends object = object, E extends EngineSupport = EngineSupport, O extends Compiler<E> = Compiler<E>, R extends Record<string, object> = Record<string, object>, M extends Model<C, P, E, O, R> = Model<C, P, E, O, R>> extends ModelNotice {
    model: M;
    ctx: M;
    puppet: P;
    target: P;
    config: C;
    engine: E;
    compiler: O;
    resources: R;
}
export type RegCommand<C extends BasicConfig = BasicConfig, P extends object = object, E extends EngineSupport = EngineSupport, O extends Compiler<E> = Compiler<E>, R extends Record<string, object> = Record<string, object>, M extends Model<C, P, E, O, R> = Model<C, P, E, O, R>> = {
    reg: RegExp;
    handler: (this: M, params: CommandParameters<C, P, E, O, R, M>) => void;
};
export type KeyCommand<C extends BasicConfig = BasicConfig, P extends object = object, E extends EngineSupport = EngineSupport, O extends Compiler<E> = Compiler<E>, R extends Record<string, object> = Record<string, object>, M extends Model<C, P, E, O, R> = Model<C, P, E, O, R>> = (this: M, params: CommandParameters<C, P, E, O, R, M>) => void;
export type CommandStructure<C extends BasicConfig = BasicConfig, P extends object = object, E extends EngineSupport = EngineSupport, O extends Compiler<E> = Compiler<E>, R extends Record<string, object> = Record<string, object>, M extends Model<C, P, E, O, R> = Model<C, P, E, O, R>> = DeepIntersection<DeepPartial<DeepRecord<DeepUnion<C, KeyCommand<C, P, E, O, R, M>>, KeyCommand<C, P, E, O, R, M>>>, {
    $reg?: RegCommand<C, P, E, O, R, M>[];
}>;
export interface ModelCommands<C extends BasicConfig = BasicConfig, P extends object = object, E extends EngineSupport = EngineSupport, O extends Compiler<E> = Compiler<E>, R extends Record<string, object> = Record<string, object>, M extends Model<C, P, E, O, R> = Model<C, P, E, O, R>> {
    add?: CommandStructure<C, P, E, O, R, M>;
    set?: CommandStructure<C, P, E, O, R, M>;
    delete?: CommandStructure<C, P, E, O, R, M>;
}
export interface ModelParameters<C extends BasicConfig = BasicConfig, P extends object = object, E extends EngineSupport = EngineSupport, O extends Compiler<E> = Compiler<E>> {
    config: C;
    engine: E;
    compiler: O;
}
export declare class Model<C extends BasicConfig = BasicConfig, P extends object = object, E extends EngineSupport = EngineSupport, O extends Compiler<E> = Compiler<E>, R extends Record<string, object> = Record<string, object>> extends EventDispatcher {
    puppet: P;
    config: C;
    engine: E;
    compiler: O;
    commands?: ModelCommands<C, P, E, O, R>;
    resources: R;
    /**
     * 该配置化模型的对象生成方法。对应defineModel.create
     * @param this model本身
     * @param params 参数对象
     * params.model model本身
     * params.config model对应的配置
     * params.engine model使用的enigne
     * params.compiler model使用的compiler
     * @returns puppet 通过配置单生成的目标对象
     */
    createPuppet: (this: any, params: {
        model: any;
        config: C;
        engine: E;
        compiler: O;
        resources: R;
    }) => P;
    /**
     * 该配置化模型的对象销毁方法。对应defineModel.dispose
     * @param this model本身
     * @param params 参数对象
     * params.model model本身
     * params.target model.puppet
     * params.puppet model.puppet
     * params.config model对应的配置
     * params.engine model使用的enigne
     * params.compiler model使用的compiler
     */
    disposePuppet: (this: any, params: {
        model: any;
        target: P;
        puppet: P;
        config: C;
        engine: E;
        compiler: O;
        resources: R;
    }) => void;
    constructor(params: ModelParameters<C, P, E, O>);
    /**
     * 转化为目标配置
     * @param vid vid标识
     * @returns Config | null
     */
    toConfig<CO extends BasicConfig>(vid: string): CO | null;
    /**
     * 转化为目标模型
     * @param vid vid标识或者 目标对象
     * @returns model | null
     */
    toModel<MO extends Model<any, any, any>>(vid: string | object): MO | null;
    /**
     * 转化为目标物体
     * @param vid vid标识
     * @returns object
     */
    toObject<OB extends object>(vid: string): OB;
    /**
     * 转化为目标物体
     * @param vid vid标识
     * @returns object
     */
    toPuppet<OB extends object>(vid: string): OB;
    /**
     * 转化为异步执行
     * @param fun 所需要执行的函数方法
     */
    toAsync(fun: (finish: boolean) => boolean): void;
    /**
     * 将函数方法加入到下一个异步队列中
     * @param fun 函数方法
     */
    asyncNextTick(fun: () => boolean): void;
    /**
     * 转化为触发器触发
     * @param name 触发器名称
     * @param fun 需要触发器触发的函数方法
     */
    toTrigger(name: string, fun: (immediate: boolean) => boolean): void;
    /**
     * 通用的处理方法
     * @param params 操作通知参数
     * @returns
     */
    process(params: CtnNotice): void;
    /**
     * 通用的操作添加方法
     * @param params 操作通知参数
     * @returns
     */
    private add;
    /**
     * 通用的操作设置方法
     * @param params 操作通知参数
     * @returns
     */
    private set;
    /**
     * 通用的操作删除方法
     * @param params 操作通知参数
     * @returns
     */
    private delete;
    /**
     * 模型生成方法内部会调用createPuppet
     */
    create(): void;
    /**
     * 模型销毁方法内部会调用disposePuppet
     */
    dispose(): void;
}
