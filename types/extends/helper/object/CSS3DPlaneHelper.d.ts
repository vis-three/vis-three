import { LineSegments } from "three";
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";
import { VisHelper } from "../common";
export declare class CSS3DPlaneHelper extends LineSegments implements VisHelper {
    target: CSS3DObject;
    type: string;
    constructor(target: CSS3DObject);
}
