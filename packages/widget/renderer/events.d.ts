import { ObjectEvent, BasicConfig } from "@vis-three/tdcm";
import { VNode } from "../vnode";
import { Object3D } from "three";
declare const EVENT_SYMBOL: unique symbol;
export interface EventOptions {
    once?: boolean;
}
export interface Invoker {
    (event: ObjectEvent): void;
    value: Function;
}
export type EventConfig = BasicConfig & {
    [EVENT_SYMBOL]?: Record<string, Invoker | undefined>;
};
export declare const createInvoker: (fn: Function) => Invoker;
export declare function parseName(name: string): [string, EventOptions];
export declare const mountEvents: (vnode: VNode, config: EventConfig, object: Object3D) => void;
export declare const updateEvents: (vnode: VNode) => void;
export declare const unmountEvents: (vnode: VNode, object: Object3D) => void;
export {};
