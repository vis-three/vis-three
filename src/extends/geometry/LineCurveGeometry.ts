import { CurvePath, LineCurve3, Vector3 } from "three";
import { CurveGeometry } from "./CurveGeometry";

export class LineCurveGeometry extends CurveGeometry {
  constructor(path: Vector3[], divisions = 36, space = true) {
    super(path, divisions, space);

    this.type = "LineCurveGeometry";

    if (!path.length) {
      console.warn(`LineCurveGeometry path length at least 1.`);
      return;
    }

    const curvePath = new CurvePath<Vector3>();

    for (let i = 1; i < path.length; i += 1) {
      curvePath.add(new LineCurve3(path[i - 1], path[i]));
    }

    const totalArcLengthDivisions = curvePath.curves.reduce((sum, curve) => {
      return (sum += curve.arcLengthDivisions);
    }, 0);

    if (divisions > totalArcLengthDivisions) {
      const mutily = Math.ceil(
        (divisions - totalArcLengthDivisions) / curvePath.curves.length
      );

      curvePath.curves.forEach((curve) => {
        curve.arcLengthDivisions = curve.arcLengthDivisions * (mutily + 1);
        curve.updateArcLengths();
      });
    }

    this.setFromPoints(
      space
        ? curvePath.getSpacedPoints(divisions)
        : curvePath.getPoints(divisions)
    );
  }
}
