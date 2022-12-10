import { LineSegments } from "three";
import { VisCSS3DSprite } from "../../../optimize/VisCSS3DSprite";
import { CSS3DSprite } from "../../object/CSS3DSprite";
import { VisHelper } from "../common";
export declare class CSS3DSpriteHelper extends LineSegments implements VisHelper {
    target: VisCSS3DSprite;
    type: string;
    private observer;
    constructor(target: CSS3DSprite);
    dispose(): void;
}
