import { Mesh } from "three";
import { Modifier, ModifierParameters } from "./Modifier";
export interface BooleanModifierParameters extends ModifierParameters {
    source: Mesh;
    target: Mesh;
    mode?: 'subtract' | 'union' | 'intersect';
}
export declare class BooleanModifier extends Modifier {
    private source;
    private target;
    private mode;
    private cacheSourceMatrix;
    private cacheTargetMatrix;
    private cacheSoruceGeometryUuid;
    private cacheTargetGeometryUuid;
    private originalGeometry;
    private modifiedGeometry;
    constructor(parameters: BooleanModifierParameters);
    private modify;
    render(): void;
    use(): void;
    dispose(): void;
}
