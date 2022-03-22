import { BaseEvent } from "../core/EventDispatcher";
import { Vector3Config } from "../middleware/common/CommonConfig";
import { Plugin } from "./plugin";
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
    };
}
export declare const ViewpointPlugin: Plugin<ViewpointParameters>;
