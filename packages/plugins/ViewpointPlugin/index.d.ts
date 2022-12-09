import { BaseEvent } from "../core/EventDispatcher";
import { Vector3Config } from "../middleware/common/CommonConfig";
import { Plugin } from "../../core/src/core/Plugin";
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
export interface ViewpointParameters {
    viewpoint?: VIEWPOINT;
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
export declare const ViewpointPlugin: Plugin<ViewpointParameters>;
