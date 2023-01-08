import { EventDispatcher } from "@vis-three/core";
import { BaseEvent, Camera, Plane, Vector2, Vector3 } from "three";
export interface VisPointerEvent extends Omit<PointerEvent, "type">, BaseEvent {
    mouse: Vector2;
}
export interface PointerManagerParameters {
    dom?: HTMLElement;
    throttleTime?: number;
}
export declare class PointerManager extends EventDispatcher {
    private dom;
    private mouse;
    private canMouseMove;
    private mouseEventTimer;
    private throttleTime;
    private pointerDownHandler;
    private pointerMoveHandler;
    private pointerUpHandler;
    private mouseDownHandler;
    private mouseUpHandler;
    private clickHandler;
    private dblclickHandler;
    private contextmenuHandler;
    constructor(parameters: PointerManagerParameters);
    /**
     * 设置当前作用的dom
     * @param dom
     * @returns
     */
    setDom(dom: HTMLElement): this;
    /**
     * 获取归一化的鼠标指针
     * @returns mouse
     */
    getNormalMouse(): Vector2;
    /**
     * 获取当前指针位置从给定相机出发的世界坐标
     * @param camera
     * @param offset
     * @param result
     * @returns
     */
    getWorldPosition(camera: Camera, offset: number, result?: Vector3): Vector3;
    /**
     * 获取当前指针从给定相机出发与给定平面的焦点
     * @param camera
     * @param plane
     * @param result
     */
    intersectPlane(camera: Camera, plane: Plane, result?: Vector3): Vector3 | null;
}
