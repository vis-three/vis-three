import { EventDispatcher } from "@vis-three/core";
import { BaseEvent, Vector2 } from "three";
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
}
