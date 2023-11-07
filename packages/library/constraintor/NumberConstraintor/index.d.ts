import { Constraintor } from "../constraintor";
export declare class NumberConstraintor extends Constraintor {
    target: {
        object: Record<string, any>;
        key: string;
    };
    reference: {
        object: Record<string, any>;
        key: string;
    };
    offset: {
        operate: "+" | "-" | "*" | "/";
        value: number;
    } | null;
    constructor(target: object, targetAttr: string, ref: object, refAttr: string, offset: {
        operate: "+" | "-" | "*" | "/";
        value: number;
    } | null);
    setTarget(object: object, attr: string): void;
    setReference(object: object, attr: string): void;
    constrain(): void;
}
