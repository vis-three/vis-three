import { EdgesGeometry, LineSegments, PlaneBufferGeometry, } from "three";
import { getHelperLineMaterial } from "../common";
export class CSS3DPlaneHelper extends LineSegments {
    target;
    // @ts-ignore
    type = "VisCSS3DPlaneHelper";
    constructor(target) {
        super();
        const element = target.element;
        const boundingBox = element.getBoundingClientRect();
        const width = boundingBox.width;
        const height = boundingBox.height;
        this.geometry = new EdgesGeometry(new PlaneBufferGeometry(width, height));
        this.geometry.computeBoundingBox();
        this.material = getHelperLineMaterial();
        this.matrixAutoUpdate = false;
        this.matrix = target.matrix;
        this.matrixWorldNeedsUpdate = false;
        this.matrixWorld = target.matrixWorld;
        this.target = target;
    }
}
//# sourceMappingURL=CSS3DPlaneHelper.js.map