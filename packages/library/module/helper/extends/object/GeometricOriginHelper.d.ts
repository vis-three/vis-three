import { CanvasTexture, Object3D, Points } from "three";
import { VisHelper } from "../common";
export declare class GeometricOriginHelper extends Points implements VisHelper {
    static colorTexture: CanvasTexture;
    target: Object3D;
    type: string;
    constructor(target: Object3D);
    dispose(): void;
}
