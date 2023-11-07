import { Constraintor } from "../constraintor";
import { Box3 } from "three";
export declare class BoundingBoxConstraintor extends Constraintor {
    target: {
        object: Record<string, any>;
        key: string;
    };
    reference: Box3;
    offset: {
        position: {
            direction: "+" | "-";
            axes: "x" | "y" | "z";
        };
        operate: "+" | "-" | "*" | "/";
        value: number;
    };
    constructor(target: object, targetAttr: string, ref: Box3);
    setTarget(object: object, attr: string): void;
    constrain(): void;
}
