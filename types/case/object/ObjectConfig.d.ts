import { Vector3Config, SymbolConfig } from "../common/CommonConfig";
export interface ObjectConfig extends SymbolConfig {
    type: string;
    castShadow: boolean;
    receiveShadow: boolean;
    lookAt: string;
    position: Vector3Config;
    rotation: Vector3Config;
    scale: Vector3Config;
}
export declare const getObjectConfig: () => ObjectConfig;
