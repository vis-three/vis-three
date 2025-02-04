import { LoadUnit } from "@vis-three/plugin-loader-manager";
import { EngineSupport } from "../../engine";
import { Compiler } from "../compiler";
import { Rule, Ruler } from "../ruler";
import { Converter } from "../converter";
import { ModelOption } from "../model";
export interface ModuleOptions<E extends EngineSupport = EngineSupport, O extends Compiler<E> = Compiler<E>> {
    /** 模块类型 建议为小驼峰*/
    type: string;
    /** 模块的编译器 */
    compiler?: new (...args: any[]) => O;
    /** 模块的编译规则 */
    rule?: Rule[];
    /** 模块所包含的配置化模型 */
    models: ModelOption<any, any, any, any, E, O>[];
    resources?: LoadUnit[];
    /** 是否为一个物体模块 */
    object?: boolean;
    /** 安装该模块对engine产生的扩展 */
    extend?: (engine: E) => void;
    /** 模块的生命周期顺序 */
    lifeOrder?: number;
}
export declare class Moduler<E extends EngineSupport = EngineSupport, O extends Compiler<E> = Compiler<E>> {
    module: ModuleOptions<E, O>;
    type: string;
    converter: Converter<any, E, O>;
    compiler: O;
    ruler: Ruler;
    preload: LoadUnit[];
    constructor(module: ModuleOptions<E, O>);
}
/**
 * 定义一个模块
 * @param module 模块选项moduleOptions
 * @returns
 */
export declare const defineModule: <E extends EngineSupport = EngineSupport, O extends Compiler<E> = Compiler<E>>(module: ModuleOptions<E, O>) => ModuleOptions<E, O>;
