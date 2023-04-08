import { BufferGeometry } from "three";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer";
export declare class VisCSS2DObject extends CSS2DObject {
    protected geometry: BufferGeometry;
    protected _width: number;
    protected _height: number;
    constructor(element?: HTMLElement);
    get width(): number;
    set width(value: number);
    get height(): number;
    set height(value: number);
}
