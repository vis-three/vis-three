import { EllipseCurve, MathUtils, Vector2 } from "three";

export class Arc3PCurve extends EllipseCurve {
  start = new Vector2();
  end = new Vector2();
  ctrl = new Vector2();

  private tempVector = new Vector2();

  constructor(
    startX: number,
    startY: number,
    ctX: number,
    ctY: number,
    endX: number,
    endY: number
  ) {
    super(0, 0, 1, 1, 0, Math.PI * 2, false, 0);

    const x1 = startX;
    const x2 = ctX;
    const x3 = endX;

    const y1 = startY;
    const y2 = ctY;
    const y3 = endY;

    const a = x1 - x2;
    const b = y1 - y2;
    const c = x1 - x3;
    const d = y1 - y3;

    const e = (x1 * x1 - x2 * x2 + (y1 * y1 - y2 * y2)) / 2;
    const f = (x1 * x1 - x3 * x3 + (y1 * y1 - y3 * y3)) / 2;

    const det = b * c - a * d;

    const rx = -(d * e - b * f) / det;
    const ry = -(a * f - c * e) / det;

    const mx = (x3 + x1) / 2;
    const my = (y3 + y1) / 2;

    const mid = new Vector2(mx, my);

    const isLeft = function (a: Vector2, b: Vector2, c: Vector2) {
      return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x) > 0;
    };

    const isSameDirecton = function (vect1: Vector2, vect2: Vector2) {
      const denominator = Math.sqrt(vect1.lengthSq() * vect2.lengthSq());

      if (denominator === 0) {
        return false;
      }

      const theta = vect1.dot(vect2) / denominator;

      return Math.acos(MathUtils.clamp(theta, -1, 1)) < Math.PI / 2;
    };

    const midPoint3 = new Vector2(x2, y2).sub(mid);
    const midRadius = new Vector2(rx, ry).sub(mid);

    const direction = isLeft(
      new Vector2(x1, y1),
      new Vector2(x3, y3),
      new Vector2(rx, ry)
    );

    const vertical =
      new Vector2(rx, ry).sub(new Vector2(mx, my)).length() *
      (direction ? -1 : 1);

    this.start.set(startX, startY);
    this.end.set(endX, endY);
    this.ctrl.set(ctX, ctY);

    const tempVector = this.tempVector;
    const start = this.start;
    const end = this.end;
    const center = new Vector2().copy(this.end).sub(this.start);
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

    this.aClockwise =
      (direction ? 1 : -1) * (isSameDirecton(midPoint3, midRadius) ? 1 : -1) < 0
        ? false
        : true;
  }
}
