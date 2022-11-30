import {
  Box3,
  Intersection,
  Matrix4,
  Raycaster,
  Vector2,
  Vector3,
} from "three";
import { VisCSS2DObject } from "../../optimize/VisCSS2DObject";

export class CSS2DPlane extends VisCSS2DObject {
  protected cacheBox: Box3 = new Box3();

  private viewWorldMatrix = new Matrix4();
  private mvPosition = new Vector3();
  matrixScale = new Vector3();
  private worldScale = new Vector3();
  private vA = new Vector3();
  private vB = new Vector3();
  private vC = new Vector3();
  private alignedPosition = new Vector2();
  private rotatedPosition = new Vector2();
  private intersectPoint = new Vector3();

  constructor(element: HTMLElement = document.createElement("div")) {
    super(element);
    this.type = "CSS2DPlane";
    this.element.classList.add("vis-css2d", "vis-css2d-plane");

    const observer = new MutationObserver(() => {
      this.matrixScale.set(
        Math.abs(this.width / 100) * 0.1,
        Math.abs(this.height / 100) * 0.1,
        1
      );
    });

    observer.observe(this.element, {
      attributeFilter: ["style"],
    });
  }

  private transformVertex(
    vertexPosition: Vector3,
    mvPosition: Vector3,
    scale: Vector3
  ) {
    const alignedPosition = this.alignedPosition;
    const rotatedPosition = this.rotatedPosition;
    const sin = 0;
    const cos = 1;
    // compute position in camera space
    (<Vector3>(<unknown>alignedPosition)).copy(vertexPosition).multiply(scale);

    // to check if rotation is not zero
    if (sin !== undefined) {
      rotatedPosition.x = cos * alignedPosition.x - sin * alignedPosition.y;
      rotatedPosition.y = sin * alignedPosition.x + cos * alignedPosition.y;
    } else {
      rotatedPosition.copy(alignedPosition);
    }

    vertexPosition.copy(mvPosition);
    vertexPosition.x += rotatedPosition.x;
    vertexPosition.y += rotatedPosition.y;

    // transform to world space
    vertexPosition.applyMatrix4(this.viewWorldMatrix);
  }

  raycast(raycaster: Raycaster, intersects: Intersection[]) {
    if (raycaster.camera === null) {
      console.error(
        'THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'
      );
    }

    this.viewWorldMatrix.copy(raycaster.camera.matrixWorld);
    this.modelViewMatrix.multiplyMatrices(
      raycaster.camera.matrixWorldInverse,
      this.matrixWorld
    );

    this.mvPosition.setFromMatrixPosition(this.modelViewMatrix);
    this.worldScale.copy(this.matrixScale).multiplyScalar(-this.mvPosition.z);

    this.transformVertex(
      this.vA.set(-0.5, -0.5, 0),
      this.mvPosition,
      this.worldScale
    );

    this.transformVertex(
      this.vB.set(0.5, -0.5, 0),
      this.mvPosition,
      this.worldScale
    );
    this.transformVertex(
      this.vC.set(0.5, 0.5, 0),
      this.mvPosition,
      this.worldScale
    );

    // check first triangle
    let intersect = raycaster.ray.intersectTriangle(
      this.vA,
      this.vB,
      this.vC,
      false,
      this.intersectPoint
    );

    if (intersect === null) {
      // check second triangle
      this.transformVertex(
        this.vB.set(-0.5, 0.5, 0),
        this.mvPosition,
        this.worldScale
      );

      intersect = raycaster.ray.intersectTriangle(
        this.vA,
        this.vC,
        this.vB,
        false,
        this.intersectPoint
      );
      if (intersect === null) {
        return;
      }
    }

    const distance = raycaster.ray.origin.distanceTo(this.intersectPoint);

    if (distance < raycaster.near || distance > raycaster.far) return;

    intersects.push({
      distance: distance,
      point: this.intersectPoint.clone(),
      face: null,
      object: this,
    });
  }
}
