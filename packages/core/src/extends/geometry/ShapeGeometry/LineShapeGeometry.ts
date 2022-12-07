import { Shape, ShapeBufferGeometry, Vector2 } from "three";

export class LineShapeGeometry extends ShapeBufferGeometry {
  constructor(path: Vector2[] = [new Vector2(0, 0)], curveSegments = 12) {
    const lineShape = new Shape();

    const move = path[0];

    if (move) {
      lineShape.moveTo(move.x, move.y);
      for (let i = 1; i < path.length; i += 1) {
        lineShape.lineTo(path[i].x, path[i].y);
      }
    }
    super(lineShape, curveSegments);

    this.type = "LineShapeGeometry";
  }
}
