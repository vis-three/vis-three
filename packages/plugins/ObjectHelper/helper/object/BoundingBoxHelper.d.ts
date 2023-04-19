import { LineSegments } from "three";
import { VisHelper } from "../common";
import { SolidObject3D } from "@vis-three/module-solid-object";
export declare class BoundingBoxHelper extends LineSegments implements VisHelper {
    target: SolidObject3D;
    type: string;
    private cacheBox;
    private compareBox;
    constructor(target: SolidObject3D);
    update(): void;
}
