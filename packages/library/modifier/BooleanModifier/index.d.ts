import { Mesh } from "three";
import { Modifier, ModifierParameters } from "@vis-three/modifier-base";
export interface BooleanModifierParameters extends ModifierParameters {
    source?: Mesh;
    target?: Mesh;
    mode?: "subtract" | "union" | "intersect";
}
export declare class BooleanModifier extends Modifier {
    _source: Mesh;
    target: Mesh;
    mode: "subtract" | "union" | "intersect";
    private originalGeometry;
    private modifiedGeometry;
    private timer;
    private throttling;
    constructor(parameters: BooleanModifierParameters);
    set source(value: Mesh);
    get source(): Mesh;
    modify(): void;
    render(): void;
    apply(): void;
    dispose(): void;
}
