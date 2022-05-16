import { CanvasTexture, Sprite } from "three";
import { VisHelper } from "../common";
export declare class SpriteHelper extends Sprite implements VisHelper {
    static alphaTexture: CanvasTexture;
    target: Sprite;
    type: string;
    constructor(sprite: Sprite);
}
