import { CubicBezierCurve3, CurvePath } from "three";
import { CurveGeometry } from "./CurveGeometry";
export class CubicBezierCurveGeometry extends CurveGeometry {
    constructor(path = [], divisions = 36, space = true) {
        super(path, divisions, space);
        this.type = "CubicBezierCurveGeometry";
        const curvePath = new CurvePath();
        if (path.length < 4) {
            console.warn(`CubicBezierCurveGeometry path length at least 4.`);
            return;
        }
        const length = 4 + (path.length - 4) - ((path.length - 4) % 3);
        for (let i = 2; i < length; i += 3) {
            curvePath.add(new CubicBezierCurve3(path[i - 2], path[i - 1], path[i], path[i + 1]));
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
//# sourceMappingURL=CubicBezierCurveGeometry.js.map