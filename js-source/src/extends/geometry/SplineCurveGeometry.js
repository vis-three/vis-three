import { CatmullRomCurve3 } from "three";
import { CurveGeometry } from "./CurveGeometry";
export class SplineCurveGeometry extends CurveGeometry {
    constructor(path, divisions = 36, space = true) {
        super(path, divisions, space);
        this.type = "SplineCurveGeometry";
        const splineCurve = new CatmullRomCurve3(path);
        this.setFromPoints(space
            ? splineCurve.getSpacedPoints(divisions)
            : splineCurve.getPoints(divisions));
    }
}
//# sourceMappingURL=SplineCurveGeometry.js.map