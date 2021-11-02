import { EventDispatcher, BaseEvent } from "three";
export declare class VisEventDispatcher<E extends BaseEvent = Event> extends EventDispatcher<E> {
    _listeners?: any;
    dispatchEvent(event: E): void;
}
//# sourceMappingURL=VisEventDispatcher.d.ts.map