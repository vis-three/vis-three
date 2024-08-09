import { BasicConfig } from "../common";
import { EngineSupport } from "../../engine";
import { CtnNotice } from "../container";
import { Model, ModelOption } from "../model";
export interface CompilerParameters<E extends EngineSupport = EngineSupport, M extends Model<any, any, E> = Model<any, any, E>> {
    module: string;
    models: ModelOption<any, any, E, M>[];
}
export declare class Compiler<E extends EngineSupport = EngineSupport, M extends Model<any, any, E> = Model<any, any, E>> {
    MODULE: string;
    builders: Map<string, new (config: any, engine: E) => M>;
    target: Record<string, BasicConfig>;
    map: Map<BasicConfig["vid"], M>;
    symbolMap: WeakMap<M["puppet"], BasicConfig["vid"]>;
    engine: E;
    constructor(params: CompilerParameters<E, M>);
    /**
     * @deprecated
     * @returns
     */
    getMap(): null;
    useEngine(engine: E): this;
    setTarget(target: Record<string, BasicConfig>): this;
    add(config: BasicConfig): BasicConfig | null;
    remove(config: BasicConfig): this;
    cover(config: BasicConfig): this;
    compile(vid: BasicConfig["vid"], notice: CtnNotice): this;
    compileAll(): this;
    dispose(): this;
    getObjectSymbol(object: object): string | null;
    getObjectBySymbol(vid: string): BasicConfig | null;
    useModel(option: ModelOption<any, any, E, M>, callback?: (compiler: this) => void): this;
    /**
     * @deprecated use useModel
     * @param processor
     * @param callback
     * @returns
     */
    useProcessor(processor: ModelOption<any, any, E, M>, callback?: (compiler: this) => void): this;
}
