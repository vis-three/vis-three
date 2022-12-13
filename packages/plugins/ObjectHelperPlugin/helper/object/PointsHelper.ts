import { CanvasGenerator } from "@vis-three/convenient";
import { CanvasTexture, Material, Points, PointsMaterial } from "three";
import { VisHelper } from "../common";

export class PointsHelper extends Points implements VisHelper {
  static alphaTexture = new CanvasTexture(
    new CanvasGenerator({ width: 512, height: 512, bgColor: "rgb(0, 0, 0)" })
      .draw((ctx) => {
        ctx.beginPath();
        ctx.strokeStyle = "rgb(255, 255, 255)";
        ctx.lineWidth = 4;
        ctx.strokeRect(0, 0, 512, 512);
        ctx.closePath();
      })
      // .preview({
      //   left: "50%",
      // })
      .get()
  );

  target: Points;
  // @ts-ignore
  type = "VisPointsHelper";
  constructor(points: Points) {
    super();
    this.target = points;

    this.geometry.dispose();
    this.geometry.copy(points.geometry);

    (this.material as Material).dispose();

    this.material = new PointsMaterial({
      color: "rgb(255, 255, 255)",
      alphaMap: PointsHelper.alphaTexture,
      transparent: true,
    });

    const material = Array.isArray(points.material)
      ? points.material[0]
      : points.material;

    if (material instanceof PointsMaterial) {
      (this.material as PointsMaterial).size = material.size;
      (this.material as PointsMaterial).sizeAttenuation =
        material.sizeAttenuation;
    }

    this.matrixAutoUpdate = false;
    this.matrixWorldNeedsUpdate = false;
    this.matrix = points.matrix;
    this.matrixWorld = points.matrixWorld;

    // TODO:update

    this.raycast = () => {};
  }
}
