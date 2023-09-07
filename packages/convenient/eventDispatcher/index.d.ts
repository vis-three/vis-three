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
    /**
     * 添加事件
     * @param type
     * @param listener
     * @returns
     */
    addEventListener<C extends BaseEvent>(type: string, listener: EventListener<C>): void;
    /**
     * 是否有此事件
     * @param type
     * @param listener
     * @returns
     */
    hasEventListener<C extends BaseEvent>(type: string, listener: EventListener<C>): boolean;
    /**
     * 移除事件
     * @param type
     * @param listener
     * @returns
     */
    removeEventListener<C extends BaseEvent>(type: string, listener: EventListener<C>): void;
    /**
     * 移除该类型的所有事件
     * @param type
     * @returns
     */
    removeEvent(type: string): void;
    /**
     * 触发事件
     * @param event
     */
    dispatchEvent<C extends BaseEvent>(event: C): void;
    /**
     * 一次性事件触发
     * @param type
     * @param listener
     */
    once<C extends BaseEvent>(type: string, listener: EventListener<C>): void;
    /**
     * 触发事件
     * @param name
     * @param params
     */
    emit<C extends BaseEvent>(name: C["type"], params?: Omit<C, "type">): void;
    /**
     * 订阅事件
     * @param type
     * @param listener
     */
    on<C extends BaseEvent>(type: C["type"], listener: EventListener<C>): void;
    /**
     * 是否有此事件
     * @param type
     * @param listener
     * @returns
     */
    has<C extends BaseEvent>(type: C["type"], listener: EventListener<C>): boolean;
    /**
     * 移除事件
     * @param type
     * @param listener
     * @returns
     */
    off<C extends BaseEvent>(type: C["type"], listener?: EventListener<C>): void;
    /**
     * 获取事件数量
     * @param type
     * @returns
     */
    eventCount(type: string): number;
    /**
     * 销毁该类型的最后一个事件
     * @param type
     * @returns
     */
    popLatestEvent(type: string): void;
    /**
     * 清空所有事件
     */
    clear(): void;
    /**
     * 当前派发器是否使用
     * @returns
     */
    useful(): boolean;
}
