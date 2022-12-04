import {
  Box3,
  EdgesGeometry,
  Event,
  Intersection,
  LineSegments,
  MeshBasicMaterial,
  Object3D,
  PlaneBufferGeometry,
  Raycaster,
  RectAreaLight,
  Vector3,
} from "three";
import { getHelperLineMaterial, VisHelper } from "../common";

export class RectAreaLightHelper extends LineSegments implements VisHelper {
  target: RectAreaLight;
  type = "VisRectAreaLightHelper";

  private cacheBox = new Box3();
  private cacheVector3 = new Vector3();
  private cacheColor: number;
  private cacheIntensity: number;

  constructor(rectAreaLight: RectAreaLight) {
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

      if (
        target.width !==
          (<PlaneBufferGeometry>this.geometry).parameters.width ||
        target.height !== (<PlaneBufferGeometry>this.geometry).parameters.height
      ) {
        this.generateShape();
      }

      if (
        target.color.getHex() !== this.cacheColor ||
        this.cacheIntensity !== target.intensity
      ) {
        (this.material as MeshBasicMaterial).color
          .copy(target.color)
          .multiplyScalar(target.intensity);
        this.cacheColor = target.color.getHex();
      }
    };
  }

  private generateShape() {
    this.geometry.dispose();
    this.geometry = new PlaneBufferGeometry(
      this.target.width,
      this.target.height,
      4,
      4
    );

    this.geometry.computeBoundingBox();
  }

  raycast(raycaster: Raycaster, intersects: Intersection[]) {
    const target = this.target;
    const box = this.cacheBox;

    box.copy(this.geometry.boundingBox!);
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
