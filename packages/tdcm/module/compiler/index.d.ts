import { BasicConfig } from "../common";
import { EngineSupport } from "../../engine";
import { CtnNotice } from "../container";
import { Model, ModelOption, ModelParameters } from "../model";
/** 编译器参数 */
export interface CompilerParameters<E extends EngineSupport = EngineSupport> {
    /**所属的模块类型 */
    module: string;
    /**可用的配置化模型 */
    models: ModelOption<any, any, any, any, E, any>[];
}
export interface Builder<E extends EngineSupport = EngineSupport, C extends Compiler<E> = Compiler<E>> {
    option: ModelOption<any, any, any, any, E>;
    Builder?: new (params: ModelParameters<any, any, E, C>) => Model<any, any, E, C>;
}
export declare class Compiler<E extends EngineSupport = EngineSupport> {
    MODULE: string;
    builders: Map<string, Builder<E, Compiler<E>>>;
    target: Record<string, BasicConfig>;
    map: Map<BasicConfig["vid"], Model<any, any, E>>;
    symbolMap: WeakMap<Model<any, any, E, this>["puppet"], BasicConfig["vid"]>;
    engine: E;
    constructor(params: CompilerParameters<E>);
    /**
     * @deprecated
     * @returns
     */
    getMap(): null;
    /**
     * 使用引擎
     * @param engine 继承于EngineSupport的engine
     * @returns this
     */
    useEngine(engine: E): this;
    /**
     * 设置配置化编译目标
     * @param target 配置化编译对象结构
     * @returns this
     */
    setTarget(target: Record<string, BasicConfig>): this;
    /**
     * 编译操作添加
     * @param config 添加的配置
     * @returns 该配置对应的模型puppet或者空
     */
    add(config: BasicConfig): any | null;
    /**
     * 编译操作移除
     * @param config 移除的配置
     * @returns this
     */
    remove(config: BasicConfig): this;
    /**
     * 编译操作覆盖
     * @param config 覆盖的配置
     * @returns this
     */
    cover(config: BasicConfig): this;
    /**
     * 编译操作运行时的编译处理
     * @param vid 配置标识
     * @param notice 运行时的操作通知
     * @returns this
     */
    compile(vid: BasicConfig["vid"], notice: CtnNotice): this;
    /**
     * 编译该实例目标下所有的配置
     * @returns this
     */
    compileAll(): this;
    /**
     * 该编译器的销毁方法
     * @returns this
     */
    dispose(): this;
    /**
     * 获取一个对象的标识
     * @param object 物体对象
     * @returns vid |null
     */
    getObjectSymbol(object: object): string | null;
    /**
     * 通过对象标识获取物体对象
     * @param vid 对象标识
     * @returns 物体对象 | null
     */
    getObjectBySymbol(vid: string): any | null;
    /**
     * 通过对象标识获取配置化模型
     * @param vid 对象标识
     * @returns 配置化模型 | null
     */
    getModelBySymbol(vid: string): Model<any, any, E> | null;
    /**
     * 使用一个配置化模型
     * @param option 配置化模型选项
     * @param callback 使用后的回调函数
     * @returns this
     */
    useModel(option: ModelOption<any, any, any, any, E>, callback?: (compiler: this) => void): this;
    /**
     * @deprecated use useModel
     * @param processor
     * @param callback
     * @returns
     */
    useProcessor(processor: ModelOption<any, any, any, any, E>, callback?: (compiler: this) => void): this;
}
