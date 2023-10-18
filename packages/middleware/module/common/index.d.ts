export interface SymbolConfig {
    vid: string;
    type: string;
    name: string;
    alias: string;
    meta: Record<string, any>;
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
export declare const getSymbolConfig: () => SymbolConfig;
export declare const uniqueSymbol: (type: string) => string;
export declare const emptyHandler: () => void;
