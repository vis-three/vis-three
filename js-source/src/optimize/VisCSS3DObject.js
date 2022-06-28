import { Box3, PlaneBufferGeometry } from "three";
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";
export class VisCSS3DObject extends CSS3DObject {
    geometry;
    _width;
    _height;
    cacheBox = new Box3();
    constructor(element = document.createElement("div")) {
        const root = document.createElement("div");
        const width = 50;
        const height = 50;
        root.style.width = `${width}px`;
        root.style.height = `${height}px`;
        root.appendChild(element);
        super(root);
        this.geometry = new PlaneBufferGeometry(width, height);
        this.geometry.computeBoundingBox();
        this._width = width;
        this._height = height;
    }
    get width() {
        return this._width;
    }
    set width(value) {
        this.geometry.dispose();
        this.geometry = new PlaneBufferGeometry(value, this._height);
        this.geometry.computeBoundingBox();
        this.element.style.width = `${value}px`;
        this._width = value;
    }
    get height() {
        return this._height;
    }
    set height(value) {
        this.geometry.dispose();
        this.geometry = new PlaneBufferGeometry(this._width, value);
        this.geometry.computeBoundingBox();
        this.element.style.height = `${value}px`;
        this._height = value;
    }
}
//# sourceMappingURL=VisCSS3DObject.js.map