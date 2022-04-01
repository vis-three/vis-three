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
export interface DirectionalLightConfig extends LightConifg {
    shadow: {
        mapSize: {
            width: number;
            height: number;
        };
        camera: {
            near: number;
            far: number;
        };
    };
}
export declare type LightConfigAllType = AmbientLightConfig | PointLightConfig | SpotLightConfig | DirectionalLightConfig;
export declare const getAmbientLightConfig: () => AmbientLightConfig;
export declare const getPointLightConfig: () => PointLightConfig;
export declare const getSpotLightConfig: () => SpotLightConfig;
export declare const getDirectionalLightConfig: () => DirectionalLightConfig;
