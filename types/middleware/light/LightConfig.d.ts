import { ObjectConfig } from "../object/ObjectConfig";
export interface LightConifg extends ObjectConfig {
    color: string;
    intensity: number;
}
export interface AmbientLightConfig extends LightConifg {
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
export declare const getAmbientLightConfig: () => AmbientLightConfig;
export declare const getPointLightConfig: () => PointLightConfig;
export declare const getSpotLightConfig: () => SpotLightConfig;
