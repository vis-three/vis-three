import { BaseEvent } from "@vis-three/core";
export declare class Hook {
    private map;
    create(object: object): void;
    dispose(object: object): void;
    check(object: object): boolean;
    emit(object: object, type: string, data?: object): void;
    on(object: object, type: string, callback: (event: BaseEvent) => void): void;
    off(object: object, type: string, callback: (event: BaseEvent) => void): void;
}
