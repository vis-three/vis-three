import { SymbolConfig } from "@vis-three/middleware";
export interface BooleanKeyframeTrackConfig {
    type: "Boolean";
    name: string;
    times: number[];
    values: boolean[];
}
export interface ColorKeyframeTrackConfig {
    type: "Color";
    name: string;
    times: number[];
    values: [number, number, number][];
    interpolation: number;
}
export interface NumberKeyframeTrackConfig {
    type: "Number";
    name: string;
    times: number[];
    values: number[];
    interpolation: number;
}
export interface QuaternionKeyframeTrackConfig {
    type: "Quaternion";
    name: string;
    times: number[];
    values: [number, number, number, number][];
    interpolation: number;
}
export interface StringKeyframeTrackConfig {
    type: "String";
    name: string;
    times: number[];
    values: string[];
    interpolation: number;
}
export interface VectorKeyframeTrackConfig {
    type: "Vector";
    name: string;
    times: number[];
    values: [number, number, number][];
    interpolation: number;
}
export type KeyframeTracks = BooleanKeyframeTrackConfig | ColorKeyframeTrackConfig | NumberKeyframeTrackConfig | QuaternionKeyframeTrackConfig | StringKeyframeTrackConfig | VectorKeyframeTrackConfig;
export interface AnimationClipConfig extends SymbolConfig {
    duration: number;
    tracks: KeyframeTracks[];
}
export interface LoadAnimationClipConfig extends SymbolConfig {
    url: string;
}
export declare const getAnimationClipConfig: () => AnimationClipConfig;
export declare const getLoadAnimationClipConfig: () => LoadAnimationClipConfig;
