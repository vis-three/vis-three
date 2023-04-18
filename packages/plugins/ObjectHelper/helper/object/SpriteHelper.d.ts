import { LineSegments, Sprite } from "three";
import { VisHelper } from "../common";
export declare class SpriteHelper extends LineSegments implements VisHelper {
    target: Sprite;
    type: string;
    constructor(target: Sprite);
}
