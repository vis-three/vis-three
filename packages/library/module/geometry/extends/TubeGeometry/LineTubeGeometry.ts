import { CurvePath, LineCurve3, TubeGeometry, Vector3 } from "three";

export class LineTubeGeometry extends TubeGeometry {
  constructor(
    path: Vector3[] = [],
    tubularSegments = 64,
    radius = 1,
    radialSegments = 8,
    closed = false
  ) {
    if (!path.length) {
      console.warn(`LineTubeGeometry path length at least 1.`);
      return;
    }

    const curvePath = new CurvePath<Vector3>();

    for (let i = 1; i < path.length; i += 1) {
      curvePath.add(new LineCurve3(path[i - 1], path[i]));
    }

    super(curvePath, tubularSegments, radius, radialSegments, closed);
    //@ts-ignore
    this.type = "LineTubeGeometry";
  }
}
