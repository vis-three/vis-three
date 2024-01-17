import { ObjectConfig } from "@vis-three/module-object";
export interface LightConifg extends ObjectConfig {
    color: string;
    intensity: number;
}
export type AmbientLightConfig = LightConifg;
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
        bias: number;
        normalBias: number;
        radius: number;
        mapSize: {
            width: number;
            height: number;
        };
        camera: {
            near: number;
            far: number;
            top: number;
            bottom: number;
            left: number;
            right: number;
        };
    };
}
export interface HemisphereLightConfig extends LightConifg {
    groundColor: string;
}
export interface RectAreaLightConfig extends LightConifg {
    width: number;
    height: number;
}
export type LightConfigAllType = AmbientLightConfig | PointLightConfig | SpotLightConfig | DirectionalLightConfig | HemisphereLightConfig | RectAreaLightConfig;
export declare const getAmbientLightConfig: () => AmbientLightConfig;
export declare const getPointLightConfig: () => PointLightConfig;
export declare const getSpotLightConfig: () => SpotLightConfig;
export declare const getDirectionalLightConfig: () => DirectionalLightConfig;
export declare const getHemisphereLightConfig: () => HemisphereLightConfig;
export declare const getRectAreaLightConfig: () => RectAreaLightConfig;
