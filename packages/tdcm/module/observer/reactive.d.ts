import { Observer } from "./Observer";
export declare const react: <T extends object>(observer: Observer<object>, object: T, father?: {
    Symbol: string;
}, key?: string) => T;
