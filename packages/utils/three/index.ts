import { MathUtils, Vector2 } from "three";

const tempVector1 = new Vector2();
const tempVector2 = new Vector2();
const tempVector3 = new Vector2();
const tempVector4 = new Vector2();
const tempVector5 = new Vector2();
const tempVector6 = new Vector2();

export const getArcDetail = function (
  startX: number,
  startY: number,
  vertical: number,
  clockwise: boolean,
  endX: number,
  endY: number
) {
  const start = tempVector1.set(startX, startY);
  const end = tempVector2.set(endX, endY);
  const mid = tempVector3.copy(end).sub(start).multiplyScalar(0.5).add(start);
  const center = tempVector4.copy(end).sub(start);
  center.set(-center.y, center.x).negate().normalize();

  const verticalDirection = tempVector5.copy(center);

  center.multiplyScalar(vertical).add(mid);

  const r = tempVector6.copy(end).sub(center).length();

  return {
    start,
    end,
    mid,
    center,
    r,
    verticalDirection,
  };
};

export const isPointLeftSideLine = function (
  line1: Vector2,
  line2: Vector2,
  point: Vector2
) {
  return (
    (line2.x - line1.x) * (point.y - line1.y) -
      (line2.y - line1.y) * (point.x - line1.x) >
    0
  );
};

export const isSameDirecton = function (vect1: Vector2, vect2: Vector2) {
  const denominator = Math.sqrt(vect1.lengthSq() * vect2.lengthSq());

  if (denominator === 0) {
    return false;
  }

  const theta = vect1.dot(vect2) / denominator;

  return Math.acos(MathUtils.clamp(theta, -1, 1)) < Math.PI / 2;
};
