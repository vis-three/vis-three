export interface BasicConfig {
    vid: string;
    type: string;
    name: string;
    alias: string;
    meta: Record<string, any>;
}
/**
 * @deprecated
 * use BasicConfig
 */
export interface SymbolConfig extends BasicConfig {
}
export interface Vector3Config {
    x: number;
    y: number;
    z: number;
}
export interface Vector2Config {
    x: number;
    y: number;
}
/**
 * 获取基础配置单结构
 * @returns
 */
export declare const getBasicConfig: () => BasicConfig;
/**
 * @deprecated
 * use getBasicConfig
 */
export declare const getSymbolConfig: () => BasicConfig;
/**
 * 默认唯一标记，通过类型生成，这个标记是固定的
 * 比如对于全局只有唯一的配置类型可以使用此方法
 * @param type 配置的类型
 * @returns
 * @example
 * const gl = uniqueSymbol('WebGLRenderer')
 */
export declare const uniqueSymbol: (type: string) => string;
/**
 * 生成标记，内部使用defineOption定义的方法
 * @returns 标记
 */
export declare const createSymbol: () => any;
/**
 * 获取配置的唯一标识
 * @param config 配置
 * @returns vid
 */
export declare const toSymbol: <C extends BasicConfig = BasicConfig>(config: C) => string;
export declare const emptyHandler: () => void;
