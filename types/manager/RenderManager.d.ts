import { EventDispatcher, BaseEvent } from "three";
export interface RenderEvent extends BaseEvent {
    delta: number;
    total: number;
}
export declare class RenderManager extends EventDispatcher<RenderEvent | BaseEvent> {
    private clock;
    private animationFrame;
    render: () => void;
    play: () => void;
    stop: () => void;
    checkHasRendering: () => boolean;
    hasVaildRender: () => boolean;
}
