import { Easing, Tween } from "@tweenjs/tween.js";
export interface AnimateParams<O extends object = any> {
    target: O;
    to: Partial<O>;
    duration?: number;
    delay?: number;
    runtime?: boolean;
    easing?: (amount: number) => number;
}
export interface Animation<O extends object = any> extends Tween<O> {
}
export { Easing };
export declare const animate: <O extends object = any>(params: AnimateParams<O>) => void;
