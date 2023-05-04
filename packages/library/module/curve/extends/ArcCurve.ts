import { EllipseCurve, Vector2 } from "three";

export class ArcCurve extends EllipseCurve {
  private start = new Vector2();
  private end = new Vector2();
  private vertical = 0;
  private center = new Vector2();

  private tempVector = new Vector2();

  constructor(
    startX: number,
    startY: number,
    vertical: number,
    clockwise: boolean,
    endX: number,
    endY: number
  ) {
    super(0, 0, 1, 1, 0, Math.PI * 2, false, 0);

    this.start.set(startX, startY);
    this.end.set(endX, endY);
    this.vertical = vertical;

    const tempVector = this.tempVector;
    const start = this.start;
    const end = this.end;
    const mid = new Vector2((endX + startX) / 2, (endY + startY) / 2);
    const center = this.center.copy(this.end).sub(this.start);
    center
      .set(-center.y, center.x)
      .negate()
      .normalize()
      .multiplyScalar(vertical)
      .add(mid);

    this.aX = center.x;
    this.aY = center.y;

    this.xRadius = tempVector.copy(end).sub(center).length();
    this.yRadius = this.xRadius;

    this.aStartAngle = tempVector.copy(start).sub(center).angle();
    this.aEndAngle = tempVector.copy(end).sub(center).angle();

    this.aClockwise = clockwise;
  }
}
