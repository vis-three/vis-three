import { CurvePath, QuadraticBezierCurve3 } from "three";
import { CurveGeometry } from "./CurveGeometry";
export class QuadraticBezierCurveGeometry extends CurveGeometry {
    constructor(path, divisions = 36, space = true) {
        super(path, divisions, space);
        this.type = "QuadraticBezierCurveGeometry";
        const curvePath = new CurvePath();
        if (path.length < 3) {
            console.error(`QuadraticBezierCurveGeometry path length at least 3.`);
        }
        const length = 3 + (path.length - 3) - ((path.length - 3) % 2);
        for (let i = 1; i < length; i += 2) {
            curvePath.add(new QuadraticBezierCurve3(path[i - 1], path[i], path[i + 1]));
        }
        const totalArcLengthDivisions = curvePath.curves.reduce((sum, curve) => {
            return (sum += curve.arcLengthDivisions);
        }, 0);
        if (divisions > totalArcLengthDivisions) {
            const mutily = Math.ceil((divisions - totalArcLengthDivisions) / curvePath.curves.length);
            curvePath.curves.forEach((curve) => {
                curve.arcLengthDivisions = curve.arcLengthDivisions * (mutily + 1);
                curve.updateArcLengths();
            });
        }
        this.setFromPoints(space
            ? curvePath.getSpacedPoints(divisions)
            : curvePath.getPoints(divisions));
    }
}
//# sourceMappingURL=QuadraticBezierCurveGeometry.js.map