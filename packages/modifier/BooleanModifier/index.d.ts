import { Mesh } from "three";
import { Modifier, ModifierParameters } from "@vis-three/modifier-base";
export interface BooleanModifierParameters extends ModifierParameters {
    source: Mesh;
    target: Mesh;
    mode?: "subtract" | "union" | "intersect";
}
export declare class BooleanModifier extends Modifier {
    source: Mesh;
    target: Mesh;
    mode: "subtract" | "union" | "intersect";
    private originalGeometry;
    private modifiedGeometry;
    constructor(parameters: BooleanModifierParameters);
    private modify;
    render(): void;
    apply(): void;
    dispose(): void;
}
