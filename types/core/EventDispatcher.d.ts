export interface BaseEvent {
    type: string;
}
export interface Event extends BaseEvent {
    target?: any;
    [attachment: string]: any;
}
export interface EventListener<E extends BaseEvent = Event> {
    (event: E): void;
}
export declare class EventDispatcher {
    private listeners;
    addEventListener<C extends BaseEvent>(type: string, listener: EventListener<C>): void;
    hasEventListener<C extends BaseEvent>(type: string, listener: EventListener<C>): boolean;
    removeEventListener<C extends BaseEvent>(type: string, listener: EventListener<C>): void;
    dispatchEvent<C extends BaseEvent>(event: C): void;
}
