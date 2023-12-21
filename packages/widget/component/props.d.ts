import { Data } from "../vnode";
type PropMethod<T, TConstructor = any> = [T] extends [
    ((...args: any) => any) | undefined
] ? {
    new (): TConstructor;
    (): T;
    readonly prototype: TConstructor;
} : never;
type PropConstructor<T = any> = {
    new (...args: any[]): T & {};
} | {
    (): T;
} | PropMethod<T>;
type PropType<T> = PropConstructor<T> | PropConstructor<T>[];
type DefaultFactory<T> = (props: Data) => T | null | undefined;
interface PropOptions<T = any, D = T> {
    type: PropType<T>;
    required?: boolean;
    default?: D | DefaultFactory<D> | null | undefined | object;
}
export type PropsOptions<P = Data> = {
    [K in keyof P]: PropOptions<P[K]>;
};
export {};
