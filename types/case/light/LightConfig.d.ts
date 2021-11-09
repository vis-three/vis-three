import { Object3DConfig } from "../common/ObjectConfig";
export interface LightConifg extends Object3DConfig {
    color: string;
    intensity: number;
}
export interface PointLightConfig extends LightConifg {
    distance: number;
    decay: number;
}
export interface SpotLightConfig extends LightConifg {
    distance: number;
    angle: number;
    penumbra: number;
    decay: number;
}
export declare const getLightConfig: () => LightConifg;
export declare const getPointLightConfig: () => PointLightConfig;
export declare const getSpotLightConfig: () => SpotLightConfig;
