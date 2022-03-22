import { BaseEvent, EventDispatcher } from "../core/EventDispatcher";
export interface RenderEvent extends BaseEvent {
    delta: number;
    total: number;
}
export declare class RenderManager extends EventDispatcher {
    private clock;
    private animationFrame;
    private fps;
    render: () => void;
    play: () => void;
    stop: () => void;
    checkHasRendering: () => boolean;
    hasVaildRender: () => boolean;
}
