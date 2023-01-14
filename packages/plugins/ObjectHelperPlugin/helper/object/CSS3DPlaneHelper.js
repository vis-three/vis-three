import { EdgesGeometry, LineSegments, PlaneBufferGeometry, } from "three";
import { getHelperLineMaterial } from "../common";
export class CSS3DPlaneHelper extends LineSegments {
    target;
    // @ts-ignore
    type = "VisCSS3DPlaneHelper";
    observer;
    constructor(target) {
        super();
        this.geometry = new EdgesGeometry(new PlaneBufferGeometry(target.width, target.height));
        this.geometry.computeBoundingBox();
        this.material = getHelperLineMaterial();
        this.matrixAutoUpdate = false;
        this.matrix = target.matrix;
        this.matrixWorldNeedsUpdate = false;
        this.matrixWorld = target.matrixWorld;
        this.target = target;
        const observer = new MutationObserver(() => {
            this.geometry.dispose();
            this.geometry = new EdgesGeometry(new PlaneBufferGeometry(target.width, target.height));
            this.geometry.computeBoundingBox();
        });
        observer.observe(target.element, {
            attributeFilter: ["style"],
        });
        this.observer = observer;
        this.raycast = () => { };
        this.updateMatrixWorld = () => { };
    }
    dispose() {
        this.observer.disconnect();
    }
}
