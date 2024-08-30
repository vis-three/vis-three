import { LineSegments, Object3D } from "three";
import { VisHelper } from "../../common";
export declare class BoundingBoxHelper extends LineSegments implements VisHelper {
    target: Object3D;
    type: string;
    private cacheBox;
    private compareBox;
    constructor(target: Object3D);
    update(): void;
    dispose(): void;
}
