import { ObjectConfig } from "@vis-three/module-object";
export interface PerspectiveCameraConfig {
    fov: number;
    aspect: number;
    near: number;
    far: number;
}
export interface OrthographicCameraConfig {
    left: number;
    right: number;
    top: number;
    bottom: number;
    near: number;
    far: number;
}
export interface LightShadowConfig<C = PerspectiveCameraConfig> {
    bias: number;
    normalBias: number;
    radius: number;
    mapSize: {
        x: number;
        y: number;
    };
    camera: C;
}
export interface LightConifg extends ObjectConfig {
    color: string;
    intensity: number;
}
export interface ShadowLightConfig<C = PerspectiveCameraConfig> extends LightConifg {
    shadow: LightShadowConfig<C>;
}
export type AmbientLightConfig = LightConifg;
export interface PointLightConfig extends ShadowLightConfig {
    distance: number;
    decay: number;
}
export interface SpotLightConfig extends ShadowLightConfig {
    distance: number;
    angle: number;
    penumbra: number;
    decay: number;
    target: string;
}
export interface DirectionalLightConfig extends ShadowLightConfig<OrthographicCameraConfig> {
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
