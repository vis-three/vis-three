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
export declare const getBasicConfig: () => BasicConfig;
/**
 * @deprecated
 * use getBasicConfig
 */
export declare const getSymbolConfig: () => BasicConfig;
export declare const uniqueSymbol: (type: string) => string;
export declare const createSymbol: () => any;
export declare const emptyHandler: () => void;
