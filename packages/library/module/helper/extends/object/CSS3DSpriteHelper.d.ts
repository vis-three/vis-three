import { CSS3DSprite } from "@vis-three/module-css3d/extends/CSS3DSprite";
import { VisCSS3DSprite } from "@vis-three/module-css3d/extends/VisCSS3DSprite";
import { LineSegments } from "three";
import { VisHelper } from "../common";
export declare class CSS3DSpriteHelper extends LineSegments implements VisHelper {
    target: VisCSS3DSprite;
    type: string;
    private observer;
    constructor(target: CSS3DSprite);
    dispose(): void;
}
