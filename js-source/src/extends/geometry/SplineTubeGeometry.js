import { CatmullRomCurve3, TubeGeometry } from "three";
export class SplineTubeGeometry extends TubeGeometry {
    constructor(path = [], tubularSegments = 64, radius = 1, radialSegments = 8, closed = false) {
        if (!path.length) {
            console.warn(`SplineTubeGeometry path length at least 1.`);
            return;
        }
        const splineCurve = new CatmullRomCurve3(path);
        super(splineCurve, tubularSegments, radius, radialSegments, closed);
        this.type = "SplineTubeGeometry";
    }
}
//# sourceMappingURL=SplineTubeGeometry.js.map