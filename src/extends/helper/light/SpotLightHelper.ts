import {
  BufferGeometry,
  Event,
  Float32BufferAttribute,
  Intersection,
  LineSegments,
  MeshBasicMaterial,
  Object3D,
  Raycaster,
  Sphere,
  SpotLight,
  Vector3,
} from "three";
import { getHelperLineMaterial, VisHelper } from "../common";

export class SpotLightHelper extends LineSegments implements VisHelper {
  sphere: Sphere;
  target: SpotLight;
  shape: LineSegments;
  type = "VisSpotLightHelper";

  private cacheVector3: Vector3;
  private cacheColor: number;
  private cacheAngle: number;
  private cacheDistance: number;

  //TODO: 手动更新api，自动更新api，support更新
  constructor(spotLight: SpotLight) {
    super();

    // 光源
    this.geometry = new BufferGeometry();
    const points = [
      -1, 0, 0, 1, 0, 0, 0, -1, 0, 0, 1, 0, 0, 0, -1, 0, 0, 1, -0.707, -0.707,
      0, 0.707, 0.707, 0, 0.707, -0.707, 0, -0.707, 0.707, 0, 0, -0.707, -0.707,
      0, 0.707, 0.707, 0, 0.707, -0.707, 0, -0.707, 0.707, -0.707, 0, -0.707,
      0.707, 0, 0.707, 0.707, 0, -0.707, -0.707, 0, 0.707,
    ];
    this.geometry.setAttribute(
      "position",
      new Float32BufferAttribute(points, 3)
    );
    this.material = getHelperLineMaterial();
    this.geometry.boundingSphere;

    // 形状辅助
    const shapeGeometry = new BufferGeometry();
    const positions = [
      0, 0, 0, 1, 0, 1, 0, 0, 0, -1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, -1, 1,
    ];
    for (let i = 0, j = 1, l = 32; i < l; i++, j++) {
      const p1 = (i / l) * Math.PI * 2;
      const p2 = (j / l) * Math.PI * 2;
      positions.push(
        Math.cos(p1),
        Math.sin(p1),
        1,
        Math.cos(p2),
        Math.sin(p2),
        1
      );
    }
    shapeGeometry.setAttribute(
      "position",
      new Float32BufferAttribute(positions, 3)
    );
    const material = getHelperLineMaterial();
    const shape = new LineSegments(shapeGeometry, material);
    shape.material.color
      .copy(spotLight.color)
      .multiplyScalar(spotLight.intensity);
    const coneLength = spotLight.distance ? spotLight.distance : 1000;
    const coneWidth = coneLength * Math.tan(spotLight.angle);
    shape.scale.set(coneWidth, coneWidth, coneLength);
    shape.raycast = () => {};

    this.add(shape);

    this.matrixAutoUpdate = false;
    this.matrix = spotLight.matrix;
    this.matrixWorldNeedsUpdate = false;
    this.matrixWorld = spotLight.matrixWorld;

    this.target = spotLight;
    this.shape = shape;
    this.sphere = new Sphere(new Vector3(0, 0, 0), 1);
    this.cacheColor = spotLight.color.getHex();
    this.cacheDistance = spotLight.distance;
    this.cacheAngle = spotLight.angle;
    this.cacheVector3 = new Vector3();
    // TODO: compiler触发eventDistpatch
    this.onBeforeRender = () => {
      const light = this.target;
      const shape = this.shape;

      let shapeUpdate = false;
      if (light.distance !== this.cacheDistance) {
        this.cacheDistance = light.distance;
        shape.scale.z = light.distance;
        shapeUpdate = true;
      }

      if (light.angle !== this.cacheAngle) {
        this.cacheAngle = light.angle;
        shapeUpdate = true;
      }

      if (shapeUpdate) {
        const range = light.distance * Math.tan(light.angle);
        shape.scale.set(range, range, light.distance);
      }

      if (light.color.getHex() !== this.cacheColor) {
        (shape.material as MeshBasicMaterial).color
          .copy(light.color)
          .multiplyScalar(light.intensity);
        this.cacheColor = light.color.getHex();
      }

      shape.lookAt(light.target.position);
    };
  }

  raycast(raycaster: Raycaster, intersects: Intersection[]) {
    const target = this.target;
    const matrixWorld = target.matrixWorld;
    const sphere = this.sphere;

    sphere.set(this.cacheVector3.set(0, 0, 0), 1);
    sphere.applyMatrix4(matrixWorld);

    if (raycaster.ray.intersectsSphere(sphere)) {
      intersects.push({
        distance: raycaster.ray.origin.distanceTo(target.position),
        object: target,
        point: target.position,
      });
    }
  }
}
