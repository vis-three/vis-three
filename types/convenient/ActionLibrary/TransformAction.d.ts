import { VisTransformControls } from "../../optimize/VisTransformControls";
import { BasicAction } from "./Action";
export interface TransformActionParameters {
    transformControls: VisTransformControls;
}
/**
 * @deprecated
 */
export declare class TransformAction implements BasicAction {
    private transfromControls;
    private nextState;
    private prevState;
    constructor(params: TransformActionParameters);
    generate(status: "next" | "prev"): void;
    next(): void;
    prev(): void;
}
