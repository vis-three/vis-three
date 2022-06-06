import { BufferGeometry, Material, Points, Vector3 } from "three";
import { Path } from "./path";

export class BrokenPath extends Path {
  constructor(anchors?: Vector3[], material?: Material | Material[]) {
    super(undefined, material);

    if (anchors && anchors.length) {
      for (const vector3 of anchors) {
        const points = new Points(
          new BufferGeometry().setFromPoints([new Vector3(0, 0, 0)]),
          Path.anchorMaterial
        );
        points.position.set(vector3.x, vector3.y, vector3.z);
        this.attach(points);
      }

      this.geometry.setFromPoints(anchors);
    }
  }
}
