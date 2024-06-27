import { BaseEvent, EventDispatcher } from "@vis-three/core";
export declare class Bus {
    map: WeakMap<object, EventDispatcher>;
    create(object: object): void;
    dispose(object: object): void;
    check(object: object): boolean;
    emit(object: object, type: string, data?: object): void;
    on(object: object, type: string, callback: (event: BaseEvent) => void): void;
    off(object: object, type: string, callback: (event: BaseEvent) => void): void;
}
export declare const compilerEvent: Bus;
export declare const configEvent: Bus;
