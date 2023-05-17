import { CanvasTexture, Group, Intersection, Raycaster, Sprite } from "three";
import { VisHelper } from "../common";
export declare class GroupHelper extends Sprite implements VisHelper {
    static colorTexture: CanvasTexture;
    target: Group;
    type: string;
    constructor(group: Group);
    raycast(raycaster: Raycaster, intersects: Intersection[]): void;
    dispose(): void;
}
