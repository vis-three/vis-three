import { CanvasTexture, Points } from "three";
import { SolidObject3D } from "@vis-three/module-solid-object";
import { VisHelper } from "../common";
export declare class GeometricOriginHelper extends Points implements VisHelper {
    static colorTexture: CanvasTexture;
    target: SolidObject3D;
    type: string;
    constructor(target: SolidObject3D);
}
