import { Component } from "../component";
export declare function callWithErrorHandling(fn: Function, instance: Component | null, args?: unknown[]): any;
export declare function callWithAsyncErrorHandling(fn: Function | Function[], instance: Component | null, args?: unknown[]): any[];
