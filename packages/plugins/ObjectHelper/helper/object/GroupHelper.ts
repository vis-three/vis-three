import {
  CanvasTexture,
  Group,
  Intersection,
  Raycaster,
  Sprite,
  SpriteMaterial,
} from "three";
import { VisHelper } from "../common";
import { CanvasGenerator } from "@vis-three/convenient";

export class GroupHelper extends Sprite implements VisHelper {
  static colorTexture = new CanvasTexture(
    new CanvasGenerator({ width: 512, height: 512 })
      .draw((ctx) => {
        ctx.beginPath();
        ctx.fillStyle = "rgba(0, 0, 0, 0)";
        ctx.fillRect(0, 0, 512, 512);
        ctx.closePath();

        ctx.translate(256, 200);
        ctx.beginPath();
        ctx.fillStyle = "yellow";
        ctx.fillRect(-200, 0, 400, 200);
        ctx.closePath();

        ctx.beginPath();
        ctx.fillStyle = "yellow";
        ctx.fillRect(-200, -70, 200, 70);
        ctx.closePath();
      })
      // .preview({
      //   left: "50%",
      // })
      .get()
  );

  target: Group;
  // @ts-ignore
  type = "VisGroupHelper";

  constructor(group: Group) {
    super();
    this.target = group;

    this.geometry.computeBoundingBox();
    this.material = new SpriteMaterial({
      map: GroupHelper.colorTexture,
    });
    this.material.depthTest = false;
    this.material.depthWrite = false;

    this.scale.set(5, 5, 5);

    const updateMatrixWorldFun = this.updateMatrixWorld.bind(this);

    this.updateMatrixWorld = (focus?: boolean) => {
      const position = this.position;
      const groupPosition = this.target.position;
      position.x = groupPosition.x;
      position.y = groupPosition.y;
      position.z = groupPosition.z;
      updateMatrixWorldFun(focus);
    };
  }

  raycast(raycaster: Raycaster, intersects: Intersection[]) {
    const matrixWorld = this.matrixWorld;
    const box = this.geometry.boundingBox!.clone();

    box.applyMatrix4(matrixWorld);

    if (raycaster.ray.intersectsBox(box)) {
      const target = this.target;
      intersects.push({
        distance: raycaster.ray.origin.distanceTo(target.position),
        object: target,
        point: target.position,
      });
    }
  }
}
