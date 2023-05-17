import { CanvasTexture, Points } from "three";
import { VisHelper } from "../common";
export declare class PointsHelper extends Points implements VisHelper {
    static alphaTexture: CanvasTexture;
    target: Points;
    type: string;
    constructor(points: Points);
    dispose(): void;
}
