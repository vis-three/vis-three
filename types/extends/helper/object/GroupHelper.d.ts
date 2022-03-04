import { Group, Intersection, LineSegments, Raycaster } from "three";
import { VisHelper } from "../common";
export declare class GroupHelper extends LineSegments implements VisHelper {
    target: Group;
    type: string;
    constructor(group: Group);
    raycast(raycaster: Raycaster, intersects: Intersection[]): void;
}
