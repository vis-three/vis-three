import { BufferGeometry, CurvePath, LineCurve3, Vector3 } from "three";
import { CurveGeometry } from "./CurveGeometry";

export class LineCurveGeometry extends CurveGeometry {
  constructor(path: Vector3[], divisions = 36, space = true) {
    super(path, divisions, space);

    this.type = "LineCurveGeometry";

    const curvePath = new CurvePath<Vector3>();

    for (let i = 1; i < path.length; i += 1) {
      curvePath.add(new LineCurve3(path[i - 1], path[i]));
    }
    this.setFromPoints(
      space
        ? curvePath.getSpacedPoints(divisions)
        : curvePath.getPoints(divisions)
    );
  }
}
