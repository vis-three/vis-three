import { EventDispatcher } from "../eventDispatcher";
export interface BaseData {
    width: number;
    height: number;
}
export declare enum RECT_EVENT {
    RELOAD = "reload",
    UPDATE = "update"
}
export declare class CanvasReactor<O extends BaseData = BaseData> extends EventDispatcher {
    static proxyGetter: (target: any, property: PropertyKey, value: any) => any;
    static proxySetter: (this: CanvasReactor, target: any, property: PropertyKey, value: any, receiver: any) => boolean;
    canvas: HTMLCanvasElement;
    data: O;
    constructor(config: O);
    setSize(): this;
    draw(): this;
}
