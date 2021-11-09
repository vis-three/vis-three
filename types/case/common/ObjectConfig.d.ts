import { Vector3Config, SymbolConfig } from "./CommonConfig";
export interface Object3DConfig extends SymbolConfig {
    type: string;
    castShadow: boolean;
    receiveShadow: boolean;
    lookAt: string;
    position: Vector3Config;
    rotation: Vector3Config;
    scale: Vector3Config;
}
export declare const getObject3DConfig: () => Object3DConfig;
