import {
  AlwaysDepth,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Event,
  Object3D,
  Points,
  PointsMaterial,
} from "three";
import { SolidObject3D } from "@vis-three/module-solid-object";
import { VisHelper } from "../common";
import { CanvasGenerator } from "@vis-three/convenient";

export class GeometricOriginHelper extends Points implements VisHelper {
  static colorTexture = new CanvasTexture(
    new CanvasGenerator({ width: 32, height: 32 })
      .draw((ctx) => {
        ctx.beginPath();
        ctx.fillStyle = "rgba(0, 0, 0, 0)";
        ctx.fillRect(0, 0, 32, 32);
        ctx.closePath();

        ctx.beginPath();
        ctx.fillStyle = "rgb(255, 163, 0)";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.arc(16, 16, 15, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
      })
      .get()
  );

  target: SolidObject3D;

  //@ts-ignore
  type = "GeometricOriginHelper";

  constructor(target: SolidObject3D) {
    super();
    this.target = target;

    this.geometry = new BufferGeometry().setAttribute(
      "position",
      new BufferAttribute(new Float32Array([0, 0, 0]), 3)
    );

    this.material = new PointsMaterial({
      map: GeometricOriginHelper.colorTexture,
      transparent: true,
      alphaTest: 0.1,
      depthFunc: AlwaysDepth,
    });

    this.matrixAutoUpdate = false;
    this.matrixWorldNeedsUpdate = false;
    this.matrix = target.matrix;
    this.matrixWorld = target.matrixWorld;
    this.renderOrder = 100;
    this.raycast = () => {};
  }

  dispose() {}
}
