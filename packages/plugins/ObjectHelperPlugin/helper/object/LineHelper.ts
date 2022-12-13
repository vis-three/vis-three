import { CanvasGenerator } from "@vis-three/convenient";
import {
  CanvasTexture,
  Event,
  Line,
  LineLoop,
  LineSegments,
  Material,
  Object3D,
  Points,
  PointsMaterial,
} from "three";
import { VisHelper } from "../common";

export class LineHelper extends Points implements VisHelper {
  static alphaTexture = new CanvasTexture(
    new CanvasGenerator({ width: 512, height: 512, bgColor: "rgb(0, 0, 0)" })
      .draw((ctx) => {
        ctx.beginPath();
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.arc(256, 256, 200, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
      })
      // .preview({
      //   left: "50%",
      // })
      .getDom()
  );

  target: Line | LineSegments | LineLoop;

  private cachaGeometryUUid: string; // 存uuid防止内存泄漏

  // @ts-ignore
  type = "VisLineHelper";
  constructor(line: Line | LineSegments | LineLoop) {
    super();

    this.target = line;

    this.geometry.dispose();
    this.geometry.copy(line.geometry);
    this.cachaGeometryUUid = line.geometry.uuid;

    this.material = new PointsMaterial({
      color: "rgb(255, 255, 255)",
      alphaMap: LineHelper.alphaTexture,
      transparent: true,
      size: 5,
      sizeAttenuation: false,
    });

    this.matrixAutoUpdate = false;
    this.matrixWorldNeedsUpdate = false;
    this.matrix = line.matrix;
    this.matrixWorld = line.matrixWorld;

    this.renderOrder = -1;

    this.raycast = () => {};

    // TODO:update pref
    this.onBeforeRender = () => {
      const target = this.target;
      if (target.geometry.uuid !== this.cachaGeometryUUid) {
        this.geometry.dispose();
        this.geometry = target.geometry.clone();
        this.cachaGeometryUUid = target.geometry.uuid;
      }
    };
  }
}
