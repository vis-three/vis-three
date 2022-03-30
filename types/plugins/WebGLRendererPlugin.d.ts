import { Camera, WebGLRendererParameters } from "three";
import { BaseEvent } from "../core/EventDispatcher";
import { Plugin } from "./plugin";
export interface SetSizeEvent extends BaseEvent {
    type: 'setSize';
    width: number;
    height: number;
}
export interface SetCameraEvent extends BaseEvent {
    type: 'setCamera';
    camera: Camera;
}
export interface Screenshot {
    width?: number;
    height?: number;
    mine?: string;
}
export declare const WebGLRendererPlugin: Plugin<WebGLRendererParameters>;
