import { Camera, Scene } from "three";
import { BaseEvent, EventDispatcher } from "./EventDispatcher";
import { Plugin } from "./Plugin";
export interface SetDomEvent extends BaseEvent {
    type: "setDom";
    dom: HTMLElement;
}
export interface SetCameraOptions {
    orbitControls?: boolean;
    transformControls?: boolean;
}
export interface SetCameraEvent extends BaseEvent {
    type: "setCamera";
    camera: Camera | string;
    oldCamera: Camera;
    options: SetCameraOptions;
}
export interface SetSceneEvent extends BaseEvent {
    type: "setScene";
    scene: Scene | string;
    oldScene: Scene;
}
export interface SetSizeEvent extends BaseEvent {
    type: "setSize";
    width: number;
    height: number;
}
export declare enum ENGINE_EVENT {
    SETDOM = "setDom",
    SETSIZE = "setSize",
    SETCAMERA = "setCamera",
    SETSCENE = "setScene",
    DISPOSE = "dispose"
}
export declare class Engine extends EventDispatcher {
    pluginTables: Map<string, Plugin | Plugin[]>;
    dom: HTMLElement;
    camera: Camera;
    scene: Scene;
    render: () => this;
    play: () => this;
    stop: () => this;
    constructor();
    install(plugin: Plugin): this;
    /**
     * 设置输出的dom
     * @param dom HTMLElement
     * @returns this
     */
    setDom(dom: HTMLElement): this;
    /**
     * 设置引擎整体尺寸
     * @param width number
     * @param height number
     * @returns this
     */
    setSize(width?: number, height?: number): this;
    /**
     * 设置当前相机
     * @param camera
     * @param options
     * @returns
     */
    setCamera(camera: Camera | string, options?: SetCameraOptions): this;
    /**
     * 设置渲染场景
     * @param scene
     * @returns
     */
    setScene(scene: Scene | string): this;
    /**
     * 清除引擎缓存
     * @returns this
     */
    dispose(): this;
}
