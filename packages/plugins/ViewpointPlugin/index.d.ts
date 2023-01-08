import { BaseEvent, Engine, Plugin } from "@vis-three/core";
export interface Vector3Config {
    x: number;
    y: number;
    z: number;
}
export declare enum VIEWPOINT {
    DEFAULT = "default",
    TOP = "top",
    BOTTOM = "bottom",
    LEFT = "left",
    RIGHT = "right",
    FRONT = "front",
    BACK = "back"
}
export interface ViewpointEvent extends BaseEvent {
    viewpoint: VIEWPOINT;
}
export interface ViewpointEngine extends Engine {
    setViewpoint: (viewpoint: VIEWPOINT) => Engine;
}
export interface ViewpointParameters {
    perspective?: {
        position?: Vector3Config;
        lookAt?: Vector3Config;
        up?: Vector3Config;
    };
    orthograpbic?: {
        distance?: number;
        up?: Vector3Config;
        allowRotate?: boolean;
    };
}
export declare const SETVIEWPOINT = "setViewpoint";
export declare const VIEWPOINT_PLUGIN: string;
export declare const ViewpointPlugin: Plugin<ViewpointEngine>;
