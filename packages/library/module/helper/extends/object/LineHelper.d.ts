import { CanvasTexture, Line, LineLoop, LineSegments, Points } from "three";
import { VisHelper } from "../common";
export declare class LineHelper extends Points implements VisHelper {
    static alphaTexture: CanvasTexture;
    target: Line | LineSegments | LineLoop;
    private cachaGeometryUUid;
    type: string;
    constructor(line: Line | LineSegments | LineLoop);
    dispose(): void;
}
