import { Intersection, Raycaster } from "three";
import { CSS3DSprite } from "three/examples/jsm/renderers/CSS3DRenderer.js";
export declare class VisCSS3DSprite extends CSS3DSprite {
    private geometry;
    private _width;
    private _height;
    private cacheBox;
    private cachePosition;
    private cacheQuaternion;
    private cacheScale;
    private cacheMatrix4;
    private rotateMatrix4;
    constructor(element?: HTMLElement);
    get width(): number;
    set width(value: number);
    get height(): number;
    set height(value: number);
    raycast(raycaster: Raycaster, intersects: Intersection[]): void;
}
