import { CatmullRomCurve3, TubeGeometry, Vector3 } from "three";

export class SplineTubeGeometry extends TubeGeometry {
  constructor(
    path: Vector3[] = [],
    tubularSegments = 64,
    radius = 1,
    radialSegments = 8,
    closed = false
  ) {
    if (!path.length) {
      console.warn(`SplineTubeGeometry path length at least 1.`);
      return;
    }

    const splineCurve = new CatmullRomCurve3(path);

    super(splineCurve, tubularSegments, radius, radialSegments, closed);

    this.type = "SplineTubeGeometry";
  }
}
