import { Constraintor } from "../constraintor";
import { Object3D } from "three";
export interface Offset {
    position: {
        direction: "+" | "-";
        axes: "x" | "y" | "z";
    };
    operate: "+" | "-" | "*" | "/";
    value: number;
}
export declare class BoundingBoxConstraintor extends Constraintor {
    target: {
        object: Record<string, any>;
        key: string;
    };
    reference: Object3D<import("three").Event>;
    offset: Offset;
    private cacheBox;
    private _space;
    constructor(target: object, targetAttr: string, space?: string, ref?: Object3D, offset?: Offset);
    get space(): string;
    set space(value: string);
    setTarget(object: object, attr: string): void;
    updateBox(): void;
    setReference(object: Object3D): void;
    constrain(): void;
}
