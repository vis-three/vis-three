import {
  Box3,
  BufferAttribute,
  BufferGeometry,
  LineBasicMaterial,
  LineSegments,
} from "three";
import { VisHelper } from "../common";
import { SolidObject3D } from "@vis-three/module-solid-object";

export class BoundingBoxHelper extends LineSegments implements VisHelper {
  target: SolidObject3D;

  type = "BoundingBoxHelper";

  private cacheBox = new Box3();
  private compareBox = new Box3();

  constructor(target: SolidObject3D) {
    const indices = new Uint16Array([
      0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7,
    ]);
    const positions = new Float32Array(8 * 3);

    const geometry = new BufferGeometry();
    geometry.setIndex(new BufferAttribute(indices, 1));
    geometry.setAttribute("position", new BufferAttribute(positions, 3));

    super(
      geometry,
      new LineBasicMaterial({ color: 0xeeff00, toneMapped: false })
    );

    this.matrixAutoUpdate = false;
    this.raycast = () => {};
    this.target = target;

    this.onBeforeRender = () => {
      this.update();
    };
  }

  update() {
    this.cacheBox.setFromObject(this.target);

    if (this.cacheBox.isEmpty()) return;
    if (this.cacheBox.equals(this.compareBox)) return;

    this.compareBox.copy(this.cacheBox);

    const min = this.cacheBox.min;
    const max = this.cacheBox.max;

    const position = this.geometry.attributes.position;
    const array = position.array as unknown as Array<number>;

    array[0] = max.x;
    array[1] = max.y;
    array[2] = max.z;
    array[3] = min.x;
    array[4] = max.y;
    array[5] = max.z;
    array[6] = min.x;
    array[7] = min.y;
    array[8] = max.z;
    array[9] = max.x;
    array[10] = min.y;
    array[11] = max.z;
    array[12] = max.x;
    array[13] = max.y;
    array[14] = min.z;
    array[15] = min.x;
    array[16] = max.y;
    array[17] = min.z;
    array[18] = min.x;
    array[19] = min.y;
    array[20] = min.z;
    array[21] = max.x;
    array[22] = min.y;
    array[23] = min.z;

    position.needsUpdate = true;

    this.geometry.computeBoundingSphere();
  }
}
