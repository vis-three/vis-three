import { CSS3DSprite, VisCSS3DSprite } from "@vis-three/core";
import { LineSegments } from "three";
import { VisHelper } from "../common";
export declare class CSS3DSpriteHelper extends LineSegments implements VisHelper {
    target: VisCSS3DSprite;
    type: string;
    private observer;
    constructor(target: CSS3DSprite);
    dispose(): void;
}
