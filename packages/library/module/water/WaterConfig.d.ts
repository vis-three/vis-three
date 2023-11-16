import { Vector3Config } from "@vis-three/middleware";
import { ObjectConfig } from "@vis-three/module-object";
export interface DeepWaterConfig extends ObjectConfig {
    geometry: string;
    textureWidth: number;
    textureHeight: number;
    waterNormals: string;
    waterColor: string;
    sunColor: string;
    sunDirection: Vector3Config;
    size: number;
    alpha: number;
    time: number;
    distortionScale: number;
    eye: Vector3Config;
    fog: boolean;
}
export declare const getDeepWaterConfig: () => DeepWaterConfig;
