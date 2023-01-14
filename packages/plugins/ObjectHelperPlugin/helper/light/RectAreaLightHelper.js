import { Box3, LineSegments, PlaneBufferGeometry, Vector3, } from "three";
import { getHelperLineMaterial } from "../common";
export class RectAreaLightHelper extends LineSegments {
    target;
    type = "VisRectAreaLightHelper";
    cacheBox = new Box3();
    cacheVector3 = new Vector3();
    cacheColor;
    cacheIntensity;
    constructor(rectAreaLight) {
        super();
        this.target = rectAreaLight;
        this.generateShape();
        const material = getHelperLineMaterial();
        material.color
            .copy(rectAreaLight.color)
            .multiplyScalar(rectAreaLight.intensity);
        this.cacheColor = rectAreaLight.color.getHex();
        this.cacheIntensity = rectAreaLight.intensity;
        this.material = material;
        this.matrixAutoUpdate = false;
        this.matrix = rectAreaLight.matrix;
        this.matrixWorldNeedsUpdate = false;
        this.matrixWorld = rectAreaLight.matrixWorld;
        this.onBeforeRender = () => {
            const target = this.target;
            if (target.width !==
                this.geometry.parameters.width ||
                target.height !== this.geometry.parameters.height) {
                this.generateShape();
            }
            if (target.color.getHex() !== this.cacheColor ||
                this.cacheIntensity !== target.intensity) {
                this.material.color
                    .copy(target.color)
                    .multiplyScalar(target.intensity);
                this.cacheColor = target.color.getHex();
            }
        };
    }
    generateShape() {
        this.geometry.dispose();
        this.geometry = new PlaneBufferGeometry(this.target.width, this.target.height, 4, 4);
        this.geometry.computeBoundingBox();
    }
    raycast(raycaster, intersects) {
        const target = this.target;
        const box = this.cacheBox;
        box.copy(this.geometry.boundingBox);
        box.applyMatrix4(target.matrixWorld);
        if (raycaster.ray.intersectBox(box, this.cacheVector3)) {
            intersects.push({
                distance: raycaster.ray.origin.distanceTo(target.position),
                object: target,
                point: target.position,
            });
        }
    }
}
