import { Path, TubeGeometry } from "three";

export class PathTubeGeometry extends TubeGeometry {
  constructor(
    path = new Path(),
    tubularSegments = 64,
    radius = 1,
    radialSegments = 8,
    closed = false
  ) {
    //@ts-ignore
    super(path, tubularSegments, radius, radialSegments, closed);
//@ts-ignore
    this.type = "PathTubeGeometry";
  }
}
