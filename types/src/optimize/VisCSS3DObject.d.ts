import { Box3, BufferGeometry } from "three";
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";
export declare class VisCSS3DObject extends CSS3DObject {
    protected geometry: BufferGeometry;
    protected _width: number;
    protected _height: number;
    protected cacheBox: Box3;
    constructor(element?: HTMLElement);
    get width(): number;
    set width(value: number);
    get height(): number;
    set height(value: number);
}
